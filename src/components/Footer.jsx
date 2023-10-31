import * as React from "react";
import Typography from "@mui/material/Typography";

export default function Footer(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      style={{ backgroundColor: "#2196f32e" }}
      align="center"
      {...props}
    >
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
