class Api::V1::LikesController < ApplicationController
  def index
    matching_count = 0 #マッチングしている人数を測定
    passive_likes = []
    current_api_v1_user.passive_likes.each do |passive_like| 

      is_matched = false #マッチングが成立したかどうかのフラグ

      active_like = Like.find_by(
        from_user_id: current_api_v1_user.id,
        to_user_id: passive_like.id
      )
      if active_like
        is_matched = true
        matching_count += 1
      end

      passive_likes <<{ passive_like: passive_like, is_matched: is_matched }
    end

    active_likes = []
    current_api_v1_user.active_likes.each do |active_like|
      is_matched = false

      passive_like = Like.find_by(
        from_user_id: active_like.id,
        to_user_id: current_api_v1_user.id
      )

      if passive_like
        is_matched = true
      end

      active_likes <<{active_like: active_like, is_matched: is_matched}
    end

    render json: {
      status: 200,
      active_likes: active_likes,
      passive_likes: passive_likes,
      matching_count: matching_count
    }
  end

  def create
    is_matched = false 

    active_like = Like.find_or_initialize_by(like_params)
    passive_like = Like.find_by(
      from_user_id: active_like.to_user_id,
      to_user_id: active_like.from_user_id
    )

    if passive_like # いいねを押した際、相手からのいいねが既に存在する場合はマッチング成立
      chat_room = ChatRoom.create #メッセージ交換用の部屋を作成

      #自分
      ChatRoomUser.find_or_create_by(
        chat_room_id: chat_room.id,
        user_id: active_like.from_user_id
      )

      #相手
      ChatRoomUser.find_or_create_by(
        chat_room_id: chat_room.id,
        user_id: passive_like.from_user_id
      )

      is_matched = true
    end

    if active_like.save
      render json: { status: 200, like: active_like, is_matched: is_matched }
    else
      render json: { status: 500, message: "作成に失敗しました" }
    end
  end



  private

    def like_params
      params.permit(:from_user_id, :to_user_id)
    end
end

