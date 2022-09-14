# NextCloud configuration
You could deploy your own or using already implemented cloud one

## Custom local server
Follow instrunctions on [NextCloud](https://nextcloud.com/) website
  
## Free cloud NextCloud service 
- Register to [B2Drop](https://marketplace.eosc-portal.eu/services/b2drop).
- Login
- Generate app password:
  - settings -> security -> create new app password
- Upload some [example experiments](../lse-demo.zip) under demo-lse folder

Documents tree needs to be as follow:
```
demo-lse
└── demo-mnist-autoencoder (or experiment name)
   └── clusters
   └── images
   └── reductions
   └── embeddings.json
   └── label.json
   └── metadata.json
```