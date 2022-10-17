# Client configuration
## Requirements
- Configured [AAI](config_AAI.md)
- Configured [Nextcloud](config_Nextcloud.md)
## Steps
- Open [configmap.yaml.template](../k8s/local/client/configmap.yaml.template)
- Fill empty fields
  - NEXT_PUBLIC_NEXTCLOUD_URL
    - If b2drop: https://b2drop.eudat.eu/
  - NEXTAUTH_URL
  - NEXTAUTH_SECRET
  - NEXTAUTH_CLIENT_ID
  - NEXTAUTH_CLIENT_SECRET
  - NEXTAUTH_WELL_KNOW_URL
  - NEXTAUTH_AUTHORIZATION_URL
  - NEXTAUTH_ACCESS_TOKEN_URL
  - NEXTAUTH_PROFILE_URL
- Duplicate file configmap.yaml.template and rename it configmap.yaml

