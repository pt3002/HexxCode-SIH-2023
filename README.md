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
    <a href = "#usage"><strong>Demo</strong></a>
    ·
    <a href="https://www.canva.com/design/DAF3TheBPcE/mPds3cU6rbFVqEu2z2EPrw/edit?utm_content=DAF3TheBPcE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"><strong>Presentation</strong></a>
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
    <li><a href="#structure-hierarchy">Structure Hierarchy</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#contributors">Contributors</a></li>
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

https://github.com/pt3002/HexxCode-SIH-2023/assets/87142731/7906c22d-8b69-4597-a603-535f0861450b

## Structure Hierarchy
![Structure_Hierarchy](https://github.com/pt3002/HexxCode-SIH-2023/assets/87142731/9b47a37c-5ee1-4805-9fd2-c6632c4c5886)


## Features

* <b> Personalized Dashboard: </b> For different Educational Stakeholders.
* <b> Calendar: </b> For setting up meetings and connecting with curriculum developers.
* <b> Curriculum Developemt Tool: </b> A collaborative tool with version control and edit access according to the group assigned to the curriculum developer.
* <b> Discussion Forum: </b> A forum for anonymous discussions with live tracking of likes, upvotes, reviews.
* <b> Latest Guidelines: </b> Mechanism through which AICTE Admin adds Indian Education Guidelines which have to be followed by different stakeholders.
* <b> Grouping Developers: </b> Right given to bureau heads to make subject wise groups and adding approved Curriculum Developers to this group.
* <b> LTP Model: </b>Lectures, Tutorials and Practicals which can be assigned for different departments.
* <b> Collecting Expert Requirements: </b>Mechanism of reviewing and rating curriculum designs approved by AICTE Admins.
* <b> Visual Analytics: </b>To get a deep understanding of the feedback received for a particular curriculum design.

## Contributors

<p>
  <strong>Prerna Tulsiani</strong>
  <br />
  <a href="https://in.linkedin.com/in/prerna-tulsiani-00b894202" rel="nofollow noreferrer">
    <img src="https://i.stack.imgur.com/gVE0j.png" alt="linkedin"> LinkedIn
  </a> &nbsp; 
  <a href="https://github.com/pt3002" rel="nofollow noreferrer">
    <img src="https://i.stack.imgur.com/tskMh.png" alt="github"> Github
  </a>
</p>
<p>
  <strong>Tanvi Kale</strong>
  <br />
  <a href="https://in.linkedin.com/in/tanvi-mahesh-kale-9669b9205" rel="nofollow noreferrer">
    <img src="https://i.stack.imgur.com/gVE0j.png" alt="linkedin"> LinkedIn
  </a> &nbsp; 
  <a href="https://github.com/kmnat" rel="nofollow noreferrer">
    <img src="https://i.stack.imgur.com/tskMh.png" alt="github"> Github
  </a>
</p>
<p>
  <strong>Jia Johnson</strong>
  <br />
  <a href="https://in.linkedin.com/in/jia-johnson-533733248" rel="nofollow noreferrer">
    <img src="https://i.stack.imgur.com/gVE0j.png" alt="linkedin"> LinkedIn
  </a> &nbsp; 
  <a href="https://github.com/jiaj21" rel="nofollow noreferrer">
    <img src="https://i.stack.imgur.com/tskMh.png" alt="github"> Github
  </a>
</p>
<p>
  <strong>Harshal Kausadikar</strong>
  <br />
  <a href="https://in.linkedin.com/in/harshal-kausadikar-805b55204" rel="nofollow noreferrer">
    <img src="https://i.stack.imgur.com/gVE0j.png" alt="linkedin"> LinkedIn
  </a> &nbsp; 
  <a href="https://github.com/HarshalAbhayKausadikar" rel="nofollow noreferrer">
    <img src="https://i.stack.imgur.com/tskMh.png" alt="github"> Github
  </a>
</p>
<p>
  <strong>Pratik Patil</strong>
  <br />
  <a href="https://in.linkedin.com/in/pratik-patil-b44a18202?trk=public_profile_browsemap-profile" rel="nofollow noreferrer">
    <img src="https://i.stack.imgur.com/gVE0j.png" alt="linkedin"> LinkedIn
  </a> &nbsp; 
  <a href="https://github.com/ppatil002" rel="nofollow noreferrer">
    <img src="https://i.stack.imgur.com/tskMh.png" alt="github"> Github
  </a>
</p>
<p>
  <strong>Abhinav Kurule</strong>
  <br />
  <a href="https://in.linkedin.com/in/abhinav-kurule-5339b3252" rel="nofollow noreferrer">
    <img src="https://i.stack.imgur.com/gVE0j.png" alt="linkedin"> LinkedIn
  </a> &nbsp; 
  <a href="https://github.com/abhi-1003" rel="nofollow noreferrer">
    <img src="https://i.stack.imgur.com/tskMh.png" alt="github"> Github
  </a>
</p>


