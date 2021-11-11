import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
const Password = (params) => {
  const {
    value,
    onChange,
    error,
    helperText,
    fullWidth,
    id,
    name,
    variant,
    label,
    autoComplete,
    required,
    margin,
  } = params;
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  return (
    <>
      <TextField
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
        margin={margin}
        fullWidth={fullWidth}
        id={id}
        name={name}
        variant={variant}
        label={label}
        autoComplete={autoComplete}
        required={required}
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};
export default Password;
