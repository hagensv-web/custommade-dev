import StyledLink from "@/components/core/StyledLink"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for CustomMade Games. Learn how we use Google Analytics, display ads, and protect your privacy without collecting or storing personal data.",
  alternates: {
    canonical: "/company/privacy-policy"
  }
}

export default function PrivacyPage(){
    return (
        <div>
            <h1>Privacy Policy</h1>

            <p>Effective Date: 2026-3-14</p>
            <p>Website Name: CustomMade Games</p>
            <p>Website URL: custommade.games</p>

            <h2>Introduction</h2>
            <p>This Privacy Policy explains how CustomMade Games (“we,” “us,” or “our”) collects, uses, and protects information when you use our website and browser-based game generators (the “Service”).</p>
            <p>By using this website, you agree to the practices described in this policy.</p>

            <h2>Information We Collect</h2>
            <h3>Personal Data</h3>
            <p>We do not require user accounts, collect names, email addresses, or contact details, store user-submitted content on our servers, maintain user profiles, or directly collect any personal information.</p>
            <p>All game inputs are processed locally in your browser and are not transmitted to or stored by us.</p>

            <h3>Information Collected Automatically</h3>
            <p>Although we do not directly collect personal data, certain third party services used on this website may automatically collect information, including:</p>
            <ul>
                <li><p>IP address</p></li>
                <li><p>Browser type and version</p></li>
                <li><p>Device type</p></li>
                <li><p>Operating system</p></li>
                <li><p>Pages visited</p></li>
                <li><p>Time spent on pages</p></li>
                <li><p>Referring website</p></li>
                <li><p>General geographic location (city/region level)</p></li>
            </ul>
            <p>This information is collected through analytics tools and advertising technologies and is not stored or controlled by us.</p>

            <h2>Analytics</h2>
            <p>We use Google Analytics to understand general website useage and improve the Service.</p>
            <p>Google Analytics may collect information such as:</p>
            <ul>
                <li><p>IP address</p></li>
                <li><p>Device and browser information</p></li>
                <li><p>Usage and interaction data</p></li>
            </ul>
            <p>We do not access personally identifiable user profiles through Google Analytics.</p>
            <p>Google may use this data in accordance with its own <StyledLink href={"https://policies.google.com/privacy"}>Privacy Policy</StyledLink>.</p>
            <p><StyledLink href={"https://tools.google.com/dlpage/gaoptout"}>Opt out of Google Analytics</StyledLink></p>

            <h2>Advertising</h2>
            <p>We may display advertisements on our website through Google Ads (including Google AdSense), and/or other third-party advertising networks.</p>
            <p>These advertising partners may use cookies or other tracking techologies to:</p>
            <ul>
                <li><p>Deliver relevant advertisements</p></li>
                <li><p>Measure ad performance</p></li>
                <li><p>Personalize advertising content</p></li>
            </ul>
            <p>We do not control how third-party advertising providers collect or use data. Their practices are governed by their respective privacy policies.</p>
            <p><StyledLink href={"https://policies.google.com/technologies/ads"}>Learn more about Google's advertising practices</StyledLink></p>
            <p><StyledLink href={"https://www.google.com/settings/ads"}>Opt out of personalized advertising</StyledLink></p>

            <h2>Cookies</h2>
            <p>This website uses cookies primarily through third-party services for:</p>
            <ul>
                <li><p>Analytics</p></li>
                <li><p>Advertising</p></li>
                <li><p>Basic functionalty</p></li>
            </ul>
            <p>You may control or disable cookies through your browser settings. Disabling cookies may affect site functionality.</p>

            <h2>Data Storage</h2>
            <p>We do not maintain databases of user information.</p>
            <p>All generators operate entirely in your browser. Any content create remains on your device unless you choose to share or export it.</p>

            <h2>Children's Privacy</h2>
            <p>This website is not directed at children under the age of 13. We cannot not knowingly collect personal information from children under 13 because we do not collect personal information from any users.</p>
            <p>If you believe a third-party service integrated into this site has collected information improperly, please contact us.</p>

            <h2>Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time to reflect changes in third party vendors.</p>
            
            <p>If you have any questions about this Privacy Policy, you may contact us at: <StyledLink href={"mailto:contact@custommade.games"} rel="nofollow">contact@custommade.games</StyledLink></p>
        </div>
    )
}