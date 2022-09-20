# Overall architecture

```mermaid
flowchart LR;
	subgraph Kubernetes Environment
		direction TB

	    Client<-->Server
	    AAI<-->Client
	    Server<-->Redis[(Redis)]
	    Redis<-->Celery<-->CloudStorage[(Cloud<br/>Storage)]
	    Server<---->CloudStorage
	    Logging([Logging])-.->Server
	    Monitoring([Monitoring])-.->Server
	end  
```
