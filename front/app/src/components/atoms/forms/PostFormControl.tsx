import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

interface PostFormControlProps {
  value: number;
  onChange: any;
  label: string;
  children: React.ReactNode;
}

const PostFormControl = ({
  value,
  onChange,
  label,
  children,
}: PostFormControlProps) => {
  return (
    <FormControl variant="outlined" margin="dense" fullWidth>
      <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={value}
        onChange={onChange}
        label={label}
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default PostFormControl;