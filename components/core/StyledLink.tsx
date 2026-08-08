import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, forwardRef } from "react";

type StyledLinkProps = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    className?: string;
  };

const StyledLink = forwardRef<HTMLAnchorElement, StyledLinkProps>(
  ({ className, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        {...props}
        className={`underline underline-offset-2 decoration-current hover:decoration-transparent ${className}`}
      />
    );
  }
);

StyledLink.displayName = "StyledLink";

export default StyledLink;