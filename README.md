# txt2JSONFile

## Use

This programm retrieves data copied in local text files from different websites.
Then it formats the contents and returns a json file.

Every different source of data needs a different format to output the json file.

### To do

It should get the data directly from the websites without the need to open the sites, copy the info and paste it to a txt file.

## Installation

### Clone the project to your PC

```sh
git clone https://github.com/codigo-magallanes/txt2JSONFile.git
```

### Enter de projects directory

```sh
cd txt2JOSNFile
```

### Install dependencies

```sh
npm install
```

To today the only dependency that the programm needs is **node-fetch**, therefore you can just install the package. The difference is that with this method you install an updated package and not the version the programm was built with originally.

```sh
npm install node-fetch
```

## Run the project

You first need to run a web server. This is a need from an older version that I will fix soon...

```python
python -m SimpleHTTPServer 5500
```

Now you can run the programm:

```sh
node app.js
```