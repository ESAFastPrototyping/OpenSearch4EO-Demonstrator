# OpenSearch for EO - Reference implementation of browser

This application provides a way to test implementations of the OpenSearch for EO. It is possible to provide any description 
document URL and in the application you can verify that the parameters are correctly loaded from the description document, 
that the parameters are correctly used in the Collections search as well as in the Products search. 

## Deployment

The current version is deployed at the [http://opensearch.eoapps.eu](http://opensearch.eoapps.eu) 

## Building the application

You need to run the following commands in the shell or command line. 

```
npm install
npm run build
```

After that there should be deployable version in the build directory. 

In case of running the application for development it is possible to run it locally using `npm start` The application then
runs at [http://localhost:3000](http://localhost:3000)

## Further development

If you would like to help in development of the application, fork the repository update the code in your work and then 
provide the Pull Request. 

If you run into the issue with the application create issue in this repository.  

## Open Search for EO

This standard is intended to provide a very simple way to make queries to a repository that contains Earth Observation 
information and to allow syndication of repositories.

The extension to the OpenSearch protocol is available at the following URL: 
http://docs.opengeospatial.org/is/13-026r8/13-026r8.html

 