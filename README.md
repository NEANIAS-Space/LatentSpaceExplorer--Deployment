# Latent Space Explorer deployment

This repository contains files and instructions to run Latent Space Explorer ([LSE](https://lse.neanias.eu))

## Requirements
- Nextcloud server instance
  - Deploy your own -> [NextCloud](https://nextcloud.com/)
  - Use already available service -> [B2Drop](https://marketplace.eosc-portal.eu/services/b2drop)
- Kubernetes cluster
  - Local minikube
  - Every k8s cluster hosted on cloud platforms (AWS, GCP, ..., or on premise)
- [AAI](https://docs.neanias.eu/projects/aai-service/en/latest/) service using OpenID protocol
  - There are some free online service providing it like Auth0
- Optional
  - logging and monitor service using logstash stack

---
**_NOTE:_** <br/>
LSE was developed in a rich cloud ecosystem that shares core services ([NEANIAS](https://docs.neanias.eu/en/latest/)), therefore implementing those services it's up to developers.
## Getting started
- Configure [Nextcloud](docs/config_Nextcloud.md)
- Configure [AAI](docs/config_AAI.md)
- Configure [Client](docs/config_client.md)
- Configure [Server](docs/config_server.md)
- Configure [minikube](docs/config_minikube.md)
- Deploy all the files in the k8s folder by using
- ```
  kubectl apply -f k8s/local --recursive
  ```

If you use that software please cite:
```
SoftwareX paper...
```
## Support
- giuseppe.vizzari@unimib.it
- thomas.cecconello@unimib.it

## License
Apache 2.0

