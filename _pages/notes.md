---
layout: notes
permalink: /notes/
---

###### Problem

how to solve /bin/bash: line 92: scripts/get-api-data.sh: Permission denied

###### Solution

just add `chmod +x` to overwrite the file Permissions. for example do this:

```
chmod +x scripts/index.sh
```

***

###### Problem

how to create a virtual environment in python

###### Solution

```
pip install virtualenv
virtualenv venv
venv\Scripts\activate
```

***

###### Problem

how to create requirements.txt file which stores the packages used in a python project

###### Solution

```
pip freeze > requirements.txt
```

***
