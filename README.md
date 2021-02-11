# Utilite for comparing of configure files 

### Tests and linter status:
![Actions Status](https://github.com/korolmaria/frontend-project-lvl2/workflows/hexlet-check/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/a06c28c55e2445ed7a11/maintainability)](https://codeclimate.com/github/korolmaria/frontend-project-lvl2/maintainability)
![Status ESLINT linting](https://github.com/korolmaria/frontend-project-lvl1/workflows/EslintStatus/badge.svg)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a06c28c55e2445ed7a11/test_coverage)](https://codeclimate.com/github/korolmaria/frontend-project-lvl2/test_coverage)


### Installation of library: ###

```
    make publish

```
### Usage: ###

```
  Usage: gendiff [options] <filepath1> <filepath2>

  Compares two configuration files and shows a difference.

  Options:
    -V, --version        output the version number
    -h, --help           output usage information
    -f, --format [type]  output format

```

### Help: ###

```
    gendiff -h

```
### Using: ###

```
    gendiff -f <format> <filepath1> <filepath2>

```
### Supported file formats: ###

    * json
    * yaml

### Supported output formats : ###

    * stylish
    * plain
    * json

**How this using in Stylish format:**
<div>
    <a href="https://asciinema.org/a/RHoBBMay3IEr64x9XEzXa0wXJ" target="_blank"><img src="https://asciinema.org/a/RHoBBMay3IEr64x9XEzXa0wXJ.svg" width = "80%" alt="gendiff_stylish"/></a>
</div>

**How this using in Plain format:**
<div>
    <a href="https://asciinema.org/a/Dh2Jr6JArM56JWvexV0kuAxPF" target="_blank"><img src="https://asciinema.org/a/Dh2Jr6JArM56JWvexV0kuAxPF.svg" width = "80%" alt="gendiff_plain"/></a>
</div>

**How this using in JSON format:**
<div>
    <a href="https://asciinema.org/a/y5zRKrHon1z4i6r9QjttVLCwY" target="_blank"><img src="https://asciinema.org/a/y5zRKrHon1z4i6r9QjttVLCwY.svg" width = "80%" alt="gendiff_json"/></a>
</div>