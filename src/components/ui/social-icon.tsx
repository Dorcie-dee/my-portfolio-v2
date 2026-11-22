import { Globe, Link2, Mail } from "lucide-react";
import { DevToIcon, GitHubIcon, LinkedInIcon } from "./brand-icons";

type SocialIconProps = {
  platform: string | null;
  className?: string;
};

/** Icon for a social link platform. Decorative: always pair with visible text or an accessible label. */
export function SocialIcon({ platform, className = "size-5" }: SocialIconProps) {
  switch (platform) {
    case "github":
      return <GitHubIcon className={className} />;
    case "linkedin":
      return <LinkedInIcon className={className} />;
    case "devto":
      return <DevToIcon className={className} />;
    case "email":
      return <Mail className={className} aria-hidden="true" />;
    case "website":
      return <Globe className={className} aria-hidden="true" />;
    default:
      return <Link2 className={className} aria-hidden="true" />;
  }
}
