import "./Footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-link">
        <a href="https://fb.com">
          <FacebookIcon className="footer-icon" />
        </a>
        <a href="https://github.com">
          <GitHubIcon className="footer-icon" />
        </a>
        <a href="https://instagram.com">
          <InstagramIcon className="footer-icon" />
        </a>
      </div>
      <div>Copyright © ...</div>
    </footer>
  );
};
export default Footer;
