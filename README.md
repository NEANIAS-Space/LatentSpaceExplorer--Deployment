# Latent Space Explorer deployment

This repository contains files and instructions to run Latent Space Explorer ([LSE](https://lse.neanias.eu))

### Built with:

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)
![Plotly](https://img.shields.io/badge/Plotly-%233F4F75.svg?style=for-the-badge&logo=plotly&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white)
![Next Cloud](https://img.shields.io/badge/Next%20Cloud-0B94DE?style=for-the-badge&logo=nextcloud&logoColor=white)

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
  kubectl apply -f k8s/minimal --recursive
  ```

### Workaround
In some recent minikube version it's possibile that image pulling goes in timeout status. A workaround is to force pulling via:
```
minikube ssh docker pull <image-name>
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