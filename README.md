<div align="center">
  <a href="https://github.com/pt3002/HexxCode-SIH-2023">
    <img src="client/public/static/images/logo/completeLogo.JPG" alt="Logo" width="400" height="100">
  </a>

  <h3 align="center">Team HexxCode - Smart India Hackathon Winner</h3>

  <p align="center">
    Problem Statement - SIH1465
    <br />
    Ministry - AICTE
    <br />
    College of Engineering Pune, Technological University (COEP Tech)
    <br />
    <a href="https://www.canva.com/design/DAF3TheBPcE/mPds3cU6rbFVqEu2z2EPrw/edit?utm_content=DAF3TheBPcE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"><strong>View Presentation »</strong></a>
    <br />
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

HexxCode's Shiksha Niyojak is a unified portal for developing a model curriculum for all the AICTE Approved institutes. This portal connects all the educational stakeholders and aids them in designing a standardized model curriculum for all the approved institutes. 

Here's a brief description and role divisions of all the stakeholders:
* <b>AICTE Admin : </b> Approves Curriculum Developers, Releases Educational Guidelines, Appoints Bureau Heads, Approves Curriculums and Redirects them to Educational Experts 
* <b>Bureau Heads : </b> Makes Subject wise groups from approved list of curriculum developers, Reviews and merges all curriculums and sends them to AICTE Admins
* <b>Curriculum Developers : </b> Develops curriculum for the allocated subject by satisfying following 5 parameters : Learning Outcomes, Modules, Assessment Details, Resources, Suggested Videos
* <b>Educational Experts : </b> Reviews curriculums for different departments according to these <a href="https://github.com/pt3002/HexxCode-SIH-2023/tree/main/client/public/static/images/logo/EducationalRequirements.JPG"><strong>25 parameters »</strong></a>


### Built With

<p>
<img src="https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" />
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>
<img src = "https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"/>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
</p>

<!-- GETTING STARTED -->
## Getting Started

Following are the instructions to set-up Shiksha Niyojak and run it locally.

### Prerequisites

Installations required:
```sh
    npm install npm@latest -g
```
<a href="https://www.mysql.com/products/workbench/"><strong>MySQL Workbench</strong></a>
<br />
<a href = "https://www.mongodb.com/products/tools/compass"><strong>MongoDB Compass</strong></a>

### Installation

1. Create a new <a href = "https://ap-south-1.console.aws.amazon.com/rds">AWS RDS (Relational Database System)</a>
2. Create a <a href = "https://www.mongodb.com/">MongoDB Database</a>
3. Git clone the repo
```sh
    git clone https://github.com/pt3002/HexxCode-SIH-2023
```
4. Add .env file in the following format in the root folder: 
```sh
    MONGO_DB = "mongodb+srv://xxx:yyy@cluster0.fznky7d.mongodb.net/SIH?retryWrites=true&w=majority"
    PORT = 5001
    DB_PORT = 3306
    HOST = "xxx.yyy.ap-south-1.rds.amazonaws.com"
    PASSWORD = "xxx"
    DATABASE = "xxx"
    JWT_SECRET = "xxx"
    CRYPTO_KEY = "xxx"
```
5. Install node modules in root and client folder:
 ```sh 
    npm i
```
6. Execute the Project in root folder:
```sh
    npm run dev
```
## Usage
Here is a Video depicting the role wise distribution of various stakeholders in developing a model curriculum.

