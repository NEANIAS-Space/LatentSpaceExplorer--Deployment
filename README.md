# Deployment

Files and instruction to run the [Latent Space Explorer](lse.neanias.eu)

# Requirements
The service was built to be productionale quickly, so it was built by leveraging on existing services of the [NEANIAS](https://docs.neanias.eu/en/latest/) H2020 funded project.

It limits the possibility to isolate the original code from the services, that are needed in order to let the sorftware works.

- A Nextcloud server instance
- A Kubernetes cluster
- A [AAI](https://docs.neanias.eu/projects/aai-service/en/latest/) service using OpenID protocol
- Optional
  - logging and monitor service using logstash stack

## Getting started
Create a secret file with right credentials to access nextcloud and AAI

Set your kubecontext (which kubernetes cluster you want to deploy the application)

Deploy all the files in the k8s folder by using

```
kubectl apply -f k8s/*
```

(An helm chart will be provided)

If you use that software please cite:
```
SoftwareX paper...
```

## Support
Contact giuseppe.vizzari@gmail.com

## Roadmap
Isolate services from dependencies make those plug and play, abilitating isolation in developement.

## Contributing
In order to contribute to the project...

## License
Apache 2.0

