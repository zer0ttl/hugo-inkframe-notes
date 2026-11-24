---
title: "A small Python script"
date: 2024-06-15
description: "A sample article with an outline and highlighted code."
tags: [python, examples]
categories: [Technical notes]
showToc: true
---

Small scripts can make repetitive work easier to check and repeat.

## Start with a list

This example names files you could include in a project. It prints one name per line.

```python
files = ["README.md", "notes.md"]

for name in files:
    print(name)
```

## Check the output

Run the script and read the output before adding more behavior. The line containing `README.md` should appear first.

### Keep a note

Record the expected output alongside the script so it's easy to compare later.
