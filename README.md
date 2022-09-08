# Deployment of latent space explorer

This repository contains files and instructions to run the [Latent Space Explorer](lse.neanias.eu)

# Requirements
- Nextcloud server instance
  - Deploy your own -> [NextCloud](https://nextcloud.com/)
  - Use already available service -> 
- Kubernetes cluster
- [AAI](https://docs.neanias.eu/projects/aai-service/en/latest/) service using OpenID protocol
  - There are some free online service providing it
- Optional
  - logging and monitor service using logstash stack

---
**_NOTE:_** <br/>
LSE was developed in a rich cloud ecosystem that shares core services ([NEANIAS](https://docs.neanias.eu/en/latest/)), therefore implementing those it's up to developers.
## Getting started
- Configure [Client](docs/config_client.md)
- Configure [Server](docs/config_server.md)
- Configure [AAI](docs/config_AAI.md)
- Configure [Nextcloud](docs/config_Nextcloud.md)
- Configure [minikube](docs/config_minikube.md)
- Deploy all the files in the k8s folder by using

```
kubectl apply -f k8s/local --recursive
```

If you use that software please cite:
```
SoftwareX paper...
```
## Support
- giuseppe.vizzari@unimib.it
- thomas.cecconello@unimib.it

## Roadmap


## Contributing


## License
Apache 2.0

