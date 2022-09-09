# Server configuration
## Requirements
- Configured [Nextcloud](config_Nextcloud.md)
## Steps
- Open [configmap.yaml.template](../k8s/local/server/configmap.yaml.template)
- Fill empty fields
    - NEXCLOUD_HOST
    - NEXCLOUD_USER
    - NEXCLOUD_PASSWORD
- Duplicate file configmap.yaml.template and rename it configmap.yaml