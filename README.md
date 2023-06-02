## Description - NFT Pinterest Feed Images Gallery

It is a dapp to mint all your gallery images. The frontend is similar to Pinterest where you can upload a photo, a title, a description, and a price. you have a board you all your pins are uploaded and the option to mint them.

## Table of Contents

1. [Technology Stack](#Technology-Stack)
1. [Environment variables](#Environment-variables)
3. [Installation & Running](#Installation-&-Running)
4. [Running the app](#Running-the-app)
5. [Project Layout (Brief Explanation Frontend)](#Project-Layout-(Brief-Explanation-Frontend))
6. [TODO](#TODO)
7. [Demo](#Demo)

## Technology Stack
    - nodejs 18.16.0
    - npm 9.5.1
    - Typescript 4.9.5
    - Hardhat 2.14.0
    - ethers 5.7.2
    - react-scripts 5.0.1
    - axios 1.4.0
    - reactjs 18.0.2
    - [Alchemy](#https://www.alchemy.com/)
    - [Pinata](#https://pinata.cloud/) 


## Environment variables 

  Rename the .env.example to .env and update these variables as you need in both, backend and frontend
    
  ```  
    API_URL="https://eth-sepolia.g.alchemy.com/v2/XXXXXXXXXXXXXXXXX"
    PRIVATE_KEY="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    PUBLIC_KEY="0xXXXXXXXXXXXXXX"
  ```
  
  ```  
    REACT_APP_PINATA_API_KEY="XXXXXXXXXXXXXXXXXXXXXXX"
    REACT_APP_PINATA_API_SECRET="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    REACT_APP_ALCHEMY_KEY="https://eth-sepolia.g.alchemy.com/v2/XXXXXXXXXXXXXXXXXXXXX"
    REACT_APP_CONTRACT_ADDRESS="0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    REACT_APP_PINATA_BASE_URL = "https://gateway.pinata.cloud/ipfs/"
    REACT_APP_PINATA_API = "https://api.pinata.cloud/pinning/"
  ```



## Installation & Running 

Backend 

```bash
$ cd backend
$ npm install
$ npx hardhat run scripts/deploy.ts --network sepolia (wait till deploy and verify the contract)
```

Frontend - you can copy & paste from backend/artifacts/contracts/NFTPinterest.sol/NFTPinterest.json which was customized by the deploy to frontend/src/components/resources
         - or you can use the one which is already in the proyect

```bash
$ cd frontend
$ npm install 
$npm run start
```

 ## Project Layout (Brief Explanation Frontend)
 ```
├── .env (Make sure to create this file locally and fill the env vars)
├── App.tsx (main root)
├── react-app-env.d.ts (defined global types for ethers & typescript)
├── src
│   ├── components (Contains all the main components and each one of them its module.css)
│   │   ├── Loading (Contains an implementation of cross app loader using OHC)
│   │   └── errorManage (it is a context managing the cross app errors )
│   │    ....
│   ├── external (Contains a class to manage the pinata external calls)
│   ├── hooks (Contains all the custom hooks for managing the metamask wallet connection, pinata, and NFT mint)
│   ├── models (Contains all the main typescript model classes used by the components)
│   └── resources (here you should paste the custom NFT contract json, which includes the abi and the address)
└── 
``` 
  
## TODO
 - Use Formic to form validations (on progress)
 - Get list of all your nft's in the frontend calling the list method of the smart contract
 - bugs & technical debts 
 
 ## Demo 
 
[here](https://nft-pinterest-feed.vercel.app)
 
