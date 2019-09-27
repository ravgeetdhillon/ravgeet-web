---
---

###### Problem

how to solve /bin/bash: line 92: scripts/get-api-data.sh: Permission denied

###### Solution

just add `chmod +x` to overwrite the file Permissions. for example do this:

```
chmod +x scripts/index.sh
```
