import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth";

interface UserRead {
  /**
   * Immutable value
   */
  type: string;
  id: string;
  attributes: User;
  links: ObjectLink;
}

interface User {
  created_at?: string;
  updated_at?: string;
  /**
   * The new users email address.
   */
  email: string;
  /**
   * Boolean to indicate if the user is blocked.
   */
  blocked?: boolean;
}

interface ObjectLink {
  "0"?: {
    rel?: string;
    uri?: string;
  };
  self?: string;
}

export interface FireflyProfile extends Record<string, unknown> {
  data: UserRead;
}

export default function Firefly<P extends FireflyProfile>(
  options: OAuthUserConfig<P> & {serverUrl: string}
): OAuthConfig<P> {
    return {
        id: "firefly",
        name: "Firefly",
        type: "oauth",
        clientId: options.clientId,
        checks: ["state"],
        clientSecret: options.clientSecret,
        authorization: {
          url: options.serverUrl + "/oauth/authorize",
          params: {scope: undefined},
        },
        token: options.serverUrl + "/oauth/token",
        userinfo:  options.serverUrl + "/api/v1/about/user",
        profile: (profile) => {
          return {
            id: profile.data.id,
            email: profile.data.attributes.email,
          };
        },
        style: {
          bg: "#1a202c",
          text: "Firefly",
          bgDark: "#1a202c",
          textDark: "#fff",
          logo: "https://www.firefly-iii.org/assets/favicon/favicon-32x32.png",
          logoDark: "https://www.firefly-iii.org/assets/favicon/favicon-32x32.png",
        }
    }
}
