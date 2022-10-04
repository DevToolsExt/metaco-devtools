import { Container, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading({
  label,
  showLogo,
}: {
  label?: string;
  showLogo?: boolean;
}) {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        flexDirection: "column",
      }}>
      {showLogo && (
        <img
          src={window.location.origin + "/icon128.png"}
          width='100px'
          height='100px'
          style={{
            marginBottom: "10px",
          }}></img>
      )}
      <CircularProgress color='secondary' />
      {label && (
        <Typography marginY={1} color='grey.500' variant='caption'>
          {label}
        </Typography>
      )}
    </Container>
  );
}
