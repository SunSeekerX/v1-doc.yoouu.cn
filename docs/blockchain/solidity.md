# Solidity

## ð å­¦ä¹ 

### å å¯åµå°¸å­¦ä¹ ææ¡£

[https://cryptozombies.io/zh/course](https://cryptozombies.io/zh/course)

## ð openzeppelin

æ ååçº¦åºãä½¿ç¨ npm è¿è¡ååã

å®ç½ï¼[https://openzeppelin.com/](https://openzeppelin.com/)

åçº¦åºå®ç½ï¼[https://openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)

åçº¦åºææ¡£ï¼[https://docs.openzeppelin.com/contracts/4.x/](https://docs.openzeppelin.com/contracts/4.x/)

Githubï¼[https://github.com/OpenZeppelin](https://github.com/OpenZeppelin)

### @openzeppelin/contracts

**ç¥è¯ç¸å³**

- æ°æå¥é¨ï¼[https://docs.openzeppelin.com/learn/developing-smart-contracts](https://docs.openzeppelin.com/learn/developing-smart-contracts)
- æéæ§å¶ï¼[https://docs.openzeppelin.com/contracts/4.x/access-control](https://docs.openzeppelin.com/contracts/4.x/access-control)
- erc20ï¼[https://docs.openzeppelin.com/contracts/4.x/erc20](https://docs.openzeppelin.com/contracts/4.x/erc20)
- erc721ï¼[https://docs.openzeppelin.com/contracts/4.x/erc721](https://docs.openzeppelin.com/contracts/4.x/erc721)
- å¬å±å½æ°ï¼ç¶åçº¦ï¼ï¼[https://docs.openzeppelin.com/contracts/4.x/utilities](https://docs.openzeppelin.com/contracts/4.x/utilities)

**å®è£**

éè¦å truffle éåä½¿ç¨

```shell
npm install @openzeppelin/contracts
```

**ä½¿ç¨**

ç´æ¥ç»§æ¿åºåçº¦å°±è¡

```solidity
// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") {
    }
}
```

## ð Metamask

å°çç¸é±åã

ææ¡£å°åï¼[https://docs.metamask.io/guide/](https://docs.metamask.io/guide/)

## ð NFT

### hashlips_art_engine

HashLips èºæ¯å¼ææ¯ä¸ä¸ªç¨äºæ ¹æ®æä¾çå¾å±åå»ºå¤ä¸ªä¸åå®ä¾çèºæ¯ä½åçå·¥å·ã

Githubï¼[https://github.com/HashLips/hashlips_art_engine](https://github.com/HashLips/hashlips_art_engine)

### Pinata

ç®¡çä¸ä¼ å° ipfs çæä»¶ã

å®ç½ï¼[https://www.pinata.cloud/](https://www.pinata.cloud/)

## ð Truffle

å¼åï¼æµè¯ï¼é¨ç½²æ¡æ¶ã

å¯ä»¥è®©ä½ ä½¿ç¨å¤é¨åï¼è¿ç§»ï¼åæµè¯ã

å®ç½ï¼[https://trufflesuite.com/](https://trufflesuite.com/)

ä¸­æææ¡£ï¼[https://learnblockchain.cn/docs/truffle/index.html](https://learnblockchain.cn/docs/truffle/index.html)

### 1. å®è£

```shell
npm install -g truffle
# å®è£å°é¡¹ç®
npm install --save-dev truffle
```

### 2. æ°å»ºåçº¦

`contracts/Box.sol`

```solidity
// contracts/Box.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Box {
  uint256 private _value;

  // Emitted when the stored value changes
  event ValueChanged(uint256 value);

  // Stores a new value in the contract
  function store(uint256 value) public {
    _value = value;
    emit ValueChanged(value);
  }

  // Reads the last stored value
  function retrieve() public view returns (uint256) {
    return _value;
  }
}
```

### 3. ç¼è¯åçº¦

**æ°å»ºéç½®æä»¶**

`truffle-config.js`

```javascript
module.exports = {
  compilers: {
    solc: {
      version: '^0.8.0',
    },
  },
}
```

**ç¼è¯åçº¦**

```shell
npx truffle compile
```

### 4. æ·»å æ´å¤åçº¦

`contracts/Auth.sol`

```solidity
// contracts/access-control/Auth.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Auth {
  address private _administrator;

  constructor(address deployer) {
    // Make the deployer of the contract the administrator
    _administrator = deployer;
  }

  function isAdministrator(address user) public view returns (bool) {
    return user == _administrator;
  }
}
```

å¯¼å¥

`contracts/Box.sol`

```solidity
// contracts/Box.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Import Auth from the access-control subdirectory
import './access-control/Auth.sol';

contract Box {
  uint256 private _value;
  Auth private _auth;

  event ValueChanged(uint256 value);

  constructor() {
    _auth = new Auth(msg.sender);
  }

  function store(uint256 value) public {
    // Require that the caller is registered as an administrator in Auth
    require(_auth.isAdministrator(msg.sender), 'Unauthorized');

    _value = value;
    emit ValueChanged(value);
  }

  function retrieve() public view returns (uint256) {
    return _value;
  }
}
```

### 5. ä½¿ç¨ OpenZeppelin åçº¦

**å¯¼å¥ OpenZeppelin åçº¦**

```shell
npm install --save-dev @openzeppelin/contracts
```

`Box.sol`

```solidity
// contracts/Box.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Import Ownable from the OpenZeppelin Contracts library
import '@openzeppelin/contracts/access/Ownable.sol';

// Make Box inherit from the Ownable contract
contract Box is Ownable {
  uint256 private _value;

  event ValueChanged(uint256 value);

  // The onlyOwner modifier restricts who can call the store function
  function store(uint256 value) public onlyOwner {
    _value = value;
    emit ValueChanged(value);
  }

  function retrieve() public view returns (uint256) {
    return _value;
  }
}
```

### 6. é¨ç½²æµè¯åå¤

**å¯å¨æ¬å°åºåé¾**

> æåæ¬¢è¿çæ¬å°åºåé¾æ¯[Ganache](https://github.com/trufflesuite/ganache-cli)ãè¦å°å¶å®è£å°æ¨çé¡¹ç®ä¸­ï¼è¯·è¿è¡ï¼

```shell
npm install --save-dev ganache-cli
```

> å¯å¨æ¶ï¼Ganache å°éæºåå»ºä¸ç»æªéå®çå¸æ·å¹¶ä¸ºå®ä»¬æä¾ä»¥å¤ªå¸ãä¸ºäºè·å¾å°å¨æ¬æåä¸­ä½¿ç¨çç¸åå°åï¼æ¨å¯ä»¥å¨ç¡®å®æ§æ¨¡å¼ä¸å¯å¨ Ganacheï¼

```shell
npx ganache-cli --deterministic
```

**æ°å»ºé¨ç½²èæ¬**

> Truffle ä½¿ç¨[è¿ç§»](https://www.trufflesuite.com/docs/truffle/getting-started/running-migrations)æ¥é¨ç½²åçº¦ãè¿ç§»ç± JavaScript æä»¶åä¸ä¸ªç¹æ®çè¿ç§»åçº¦ç»æï¼ç¨äºè·è¸ªé¾ä¸çè¿ç§»ã
>
> æä»¬å°åå»ºä¸ä¸ª JavaScript è¿ç§»æ¥é¨ç½²æä»¬ç Box åçº¦ãæä»¬å°æ­¤æä»¶å¦å­ä¸º`migrations/2_deploy.js`.

`migrations/2_deploy.js`

```javascript
// migrations/2_deploy.js
const Box = artifacts.require('Box')

module.exports = async function (deployer) {
  await deployer.deploy(Box)
}
```

> å¨æä»¬é¨ç½²ä¹åï¼æä»¬éè¦éç½®å° ganache çè¿æ¥ãæä»¬éè¦ä¸º localhost åç«¯å£ 8545 æ·»å ä¸ä¸ªå¼åç½ç»ï¼è¿æ¯æä»¬æ¬å°åºåé¾æ­£å¨ä½¿ç¨çã

`truffle-config.js`

```javascript
module.exports = {
  networks: {
    development: {
      host: '127.0.0.1', // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: '*', // Any network (default: none)
    },
  },
  compilers: {
    solc: {
      version: '0.8.4',
    },
  },
}
```

### 7. é¨ç½²

æ³¨æéè¦å¨å¦å¤çå½ä»¤è¡é¢æ¿å¯å¨ä¸ä¸ªæ¬å°çé¢æè½è¿è¡é¨ç½²æµè¯ï¼

```shell
npx truffle migrate --network development
```

### 8. æµè¯äº¤äº - æ§å¶å°

```shell
npx truffle console --network development
```

æ§è¡ä»¥ä¸å½ä»¤è¡å°±è¿å¥äº `nodejs` çå½ä»¤äº¤äºé¢æ¿

è·åéè¦æä½çåçº¦å¯¹è±¡

```javascript
const box = await Box.deployed()
```

**åéäº¤æ**

```javascript
await box.store(42)
```

**æ¥è¯¢ç¶æ**

> `Box`çå¦ä¸ä¸ªå½æ°è¢«è°ç¨`retrieve`ï¼å®è¿åå­å¨å¨åçº¦ä¸­çæ´æ°å¼ãè¿æ¯åºåé¾ç¶æç*æ¥è¯¢*ï¼æä»¥æä»¬ä¸éè¦åéäº¤æï¼

```javascript
await box.retrieve()
```

> å ä¸ºæ¥è¯¢åªè¯»åç¶æèä¸åéäºå¡ï¼æä»¥æ²¡æè¦æ¥åçäºå¡åå¸ãè¿ä¹æå³çä½¿ç¨æ¥è¯¢ä¸éè¦ä»»ä½ä»¥å¤ªå¸ï¼å¹¶ä¸å¯ä»¥å¨ä»»ä½ç½ç»ä¸åè´¹ä½¿ç¨ã
>
> æä»¬ç`Box`åçº¦è¿å`uint256`çæ°å­å¯¹äº JavaScript æ¥è¯´å¤ªå¤§äºï¼æä»¥æä»¬è¿åçæ¯ä¸ä¸ªå¤§æ°å­å¯¹è±¡ãæä»¬å¯ä»¥ä½¿ç¨ å°å¤§æ°æ¾ç¤ºä¸ºå­ç¬¦ä¸²`(await box.retrieve()).toString()`ã

```javascript
;(await box.retrieve()).toString()
```

### 9. æµè¯äº¤äº - ç¼ç¨

æ°å»ºä¸ä¸ª `scripts/index.js` æä»¶ï¼éé¢åä¸éè¦æµè¯çä»£ç 

æä»¬çä»£ç é½åå¥å° `main` å½æ°å

`scripts/index.js`

```javascript
// scripts/index.js
module.exports = async function main(callback) {
  try {
    // Our code will go here
    // Retrieve accounts from the local node
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    callback(0)
  } catch (error) {
    console.error(error)
    callback(1)
  }
}
```

**è¿è¡æµè¯**

```shell
npx truffle exec --network development ./scripts/index.js
```

**è·ååçº¦å®ä¾**

> ä¸ºäºä¸[`Box`](https://docs.openzeppelin.com/learn/deploying-and-interacting?pref=truffle#box-contract)æä»¬é¨ç½²çåçº¦è¿è¡äº¤äºï¼æä»¬å°ä½¿ç¨ Truffle åçº¦æ½è±¡ï¼è¿æ¯ä¸ä¸ª JavaScript å¯¹è±¡ï¼ä»£è¡¨æä»¬å¨åºåé¾ä¸çåçº¦ã

```javascript
// Set up a Truffle contract, representing our deployed Box instance
const Box = artifacts.require('Box')
const box = await Box.deployed()

// è·åçå­éçå¼
const value1 = await box.retrieve()
console.log('Box value is', value1.toString())

// å­å¥ä¸ä¸ªæ°çå¼
await box.store(23)

// è·åå­å¥çå¼
const value2 = await box.retrieve()
console.log('Box value is', value2.toString())
```

### 10. ç¼åååæµè¯

### ethpm åç®¡ç

[ERC190 è§è](https://github.com/ethereum/EIPs/issues/190) ä¸çåç®¡çï¼ä½æ¯æµè§åçæ¶ååºç°é®é¢ï¼æ¥ç git é¡¹ç®ï¼ä¸è¬çé¡¹ç®é½æ¯ç¨ç npm æ¥åå sol åºã

å®ç½ï¼[https://www.ethpm.com/](https://www.ethpm.com/)

### Ganache

ä¸ªäººä¾¿æºå¼çåºåé¾å®¢æ·ç«¯ãå¯ä»¥ç¨æ¥å¼åæµè¯åçº¦ãæ¯æ windowsï¼linux å macã

å®ç½ææ¡£ï¼[https://trufflesuite.com/docs/ganache/index.html](https://trufflesuite.com/docs/ganache/index.html)

## ð hardhat

å¦å¤çå¼åæ¡æ¶ã

å®ç½ï¼[https://hardhat.org/](https://hardhat.org/)

### 1. å®è£

```shell
npm install --save-dev hardhat
```

### 2. æ°å»ºåçº¦

`contracts/Box.sol`

```solidity
// contracts/Box.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Box {
  uint256 private _value;

  // Emitted when the stored value changes
  event ValueChanged(uint256 value);

  // Stores a new value in the contract
  function store(uint256 value) public {
    _value = value;
    emit ValueChanged(value);
  }

  // Reads the last stored value
  function retrieve() public view returns (uint256) {
    return _value;
  }
}
```

### 3. ç¼è¯åçº¦

**çæéç½®æä»¶**

```shell
npx hardhat
```

éæ© `Create an empty hardhat.config.js`

å¯ä»¥å¨ `hardhat.config` éç½®ç¼è¯å¨çæ¬

```javascript
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.4',
}
```

**ç¼è¯åçº¦ä»£ç **

ä»¥å¤ªåèææº (EVM) ä¸è½ç´æ¥æ§è¡ Solidity ä»£ç ï¼æä»¬é¦åéè¦å°å¶ç¼è¯ä¸º EVM å­èç ã

```shell
npx hardhat compile
```

### 4. æ·»å æ´å¤åçº¦

`contracts/Auth.sol`

```solidity
// contracts/access-control/Auth.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Auth {
  address private _administrator;

  constructor(address deployer) {
    // Make the deployer of the contract the administrator
    _administrator = deployer;
  }

  function isAdministrator(address user) public view returns (bool) {
    return user == _administrator;
  }
}
```

å¯¼å¥

`contracts/Box.sol`

```solidity
// contracts/Box.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Import Auth from the access-control subdirectory
import './access-control/Auth.sol';

contract Box {
  uint256 private _value;
  Auth private _auth;

  event ValueChanged(uint256 value);

  constructor() {
    _auth = new Auth(msg.sender);
  }

  function store(uint256 value) public {
    // Require that the caller is registered as an administrator in Auth
    require(_auth.isAdministrator(msg.sender), 'Unauthorized');

    _value = value;
    emit ValueChanged(value);
  }

  function retrieve() public view returns (uint256) {
    return _value;
  }
}
```

### 5. ä½¿ç¨ OpenZeppelin åçº¦

**å¯¼å¥ OpenZeppelin åçº¦**

```shell
npm install --save-dev @openzeppelin/contracts
```

`Box.sol`

```solidity
// contracts/Box.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Import Ownable from the OpenZeppelin Contracts library
import '@openzeppelin/contracts/access/Ownable.sol';

// Make Box inherit from the Ownable contract
contract Box is Ownable {
  uint256 private _value;

  event ValueChanged(uint256 value);

  // The onlyOwner modifier restricts who can call the store function
  function store(uint256 value) public onlyOwner {
    _value = value;
    emit ValueChanged(value);
  }

  function retrieve() public view returns (uint256) {
    return _value;
  }
}
```

### 6. é¨ç½²æµè¯åå¤

hardhat èªå¸¦äºä¸ä¸ªæ¬å°æµè¯ç½ç»,æ¯æ¬¡å¯å¨é½ä¼åå»ºä¸ä¸ªæ°çæ¬å°åºåèç¹ã

```shell
npx hardhat node
```

**å®è£éè¦ç¨å°çä¾èµ**

```shell
npm install --save-dev @nomiclabs/hardhat-ethers ethers
```

**æ·»å æä»¶å° `hardhat.config.js`**

```javascript
// hardhat.config.js
require('@nomiclabs/hardhat-ethers');
...
module.exports = {
...
};
```

**æ°å»ºé¨ç½²èæ¬**

`scripts\deploy.js`

```javascript
// scripts/deploy.js
async function main() {
  // We get the contract to deploy
  const Box = await ethers.getContractFactory('Box')
  console.log('Deploying Box...')
  const box = await Box.deploy()
  await box.deployed()
  console.log('Box deployed to:', box.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

### 7. é¨ç½²

æ³¨æéè¦å¨å¦å¤çå½ä»¤è¡é¢æ¿å¯å¨ä¸ä¸ªæ¬å°çé¢æè½è¿è¡é¨ç½²æµè¯ï¼

```shell
npx hardhat run --network localhost scripts/deploy.js
```

### 8. æµè¯äº¤äº - æ§å¶å°

```shell
npx hardhat console --network localhost
```

æ§è¡ä»¥ä¸å½ä»¤è¡å°±è¿å¥äº `nodejs` çå½ä»¤äº¤äºé¢æ¿

è·åéè¦æä½çåçº¦å¯¹è±¡

```javascript
const Box = await ethers.getContractFactory('Box')
const box = await Box.attach('0x5FbDB2315678afecb367f032d93F642f64180aa3')
```

**åéäº¤æ**

> `Box`çç¬¬ä¸ä¸ªå½æ°ï¼`store`æ¥æ¶ä¸ä¸ªæ´æ°å¼å¹¶å°å¶å­å¨å¨åçº¦å­å¨ä¸­ãå ä¸ºè¿ä¸ªå½æ°*ä¿®æ¹*äºåºåé¾ç¶æï¼æä»¥æä»¬éè¦ååçº¦*åéä¸ä¸ªäº¤æ*æ¥æ§è¡å®ã
>
> æä»¬å°åéä¸ä¸ªäº¤ææ¥è°ç¨`store`å¸¦ææ°å¼çå½æ°ï¼

```javascript
await box.store(42)
/*
{
  hash: '0x3d86c5c2c8a9f31bedb5859efa22d2d39a5ea049255628727207bc2856cce0d3',
...
*/
```

**æ¥è¯¢ç¶æ**

> `Box`çå¦ä¸ä¸ªå½æ°è¢«è°ç¨`retrieve`ï¼å®è¿åå­å¨å¨åçº¦ä¸­çæ´æ°å¼ãè¿æ¯åºåé¾ç¶æç*æ¥è¯¢*ï¼æä»¥æä»¬ä¸éè¦åéäº¤æï¼

```javascript
await box.retrieve()
// BigNumber { _hex: '0x2a', _isBigNumber: true }
```

> å ä¸ºæ¥è¯¢åªè¯»åç¶æèä¸åéäºå¡ï¼æä»¥æ²¡æè¦æ¥åçäºå¡åå¸ãè¿ä¹æå³çä½¿ç¨æ¥è¯¢ä¸éè¦ä»»ä½ä»¥å¤ªå¸ï¼å¹¶ä¸å¯ä»¥å¨ä»»ä½ç½ç»ä¸åè´¹ä½¿ç¨ã
>
> æä»¬ç`Box`åçº¦è¿å`uint256`çæ°å­å¯¹äº JavaScript æ¥è¯´å¤ªå¤§äºï¼æä»¥æä»¬è¿åçæ¯ä¸ä¸ªå¤§æ°å­å¯¹è±¡ãæä»¬å¯ä»¥ä½¿ç¨ å°å¤§æ°æ¾ç¤ºä¸ºå­ç¬¦ä¸²`(await box.retrieve()).toString()`ã

```javascript
;(await box.retrieve()).toString()
// '42'
```

### 9. æµè¯äº¤äº - ç¼ç¨

æ°å»ºä¸ä¸ª `scripts/index.js` æä»¶ï¼éé¢åä¸éè¦æµè¯çä»£ç 

æä»¬çä»£ç é½åå¥å° `main` å½æ°å

`scripts/index.js`

```javascript
// scripts/index.js
async function main() {
  // æä»¬çä»£ç åå°è¿é
  // è·åæ¬å°èç¹å¯å¨çè´¦æ·
  const accounts = await ethers.provider.listAccounts()
  console.log(accounts)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

**è¿è¡æµè¯**

ä½¿ç¨ `hardhat` è¿è¡èæ¬ä¼æ³¨å¥ä¸äºå¨å±åéï¼ä¾å¦ `ethers`

```shell
npx hardhat run --network localhost ./scripts/index.js
```

**è·ååçº¦å®ä¾**

> ä¸ºäºä¸[`Box`](https://docs.openzeppelin.com/learn/deploying-and-interacting#box-contract)æä»¬é¨ç½²çåçº¦è¿è¡äº¤äºï¼æä»¬å°ä½¿ç¨ä¸ä¸ª[ethers åçº¦å®ä¾](https://docs.ethers.io/v5/api/contract/contract/)ã
>
> ethers åçº¦å®ä¾æ¯ä¸ä¸ª JavaScript å¯¹è±¡ï¼å®ä»£è¡¨æä»¬å¨åºåé¾ä¸çåçº¦ï¼æä»¬å¯ä»¥ä½¿ç¨å®æ¥ä¸æä»¬çåçº¦è¿è¡äº¤äºãè¦å°å¶éå å°æä»¬é¨ç½²çåçº¦ä¸­ï¼æä»¬éè¦æä¾åçº¦å°åã

```javascript
// è¿éæ¿æ¢ä¸ºæ§å¶å°é¨ç½²è¾åºçåçº¦å°å
const address = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'
const Box = await ethers.getContractFactory('Box')
const box = await Box.attach(address)

// è·åçå­éçå¼
const value1 = await box.retrieve()
console.log('Box value is', value1.toString())

// å­å¥ä¸ä¸ªæ°çå¼
await box.store(23)

// è·åå­å¥çå¼
const value2 = await box.retrieve()
console.log('Box value is', value2.toString())
```

### 10. ç¼åååæµè¯

## ð EIP

### erc20

æ å erc20 æ¥å£

```solidity
interface ERC20 {
  function totalSupply() external view returns (uint256);
  function balanceOf(address who) external view returns (uint256);
  function transfer(address to, uint256 value) external returns (bool);
  function allowance(address owner, address spender) external view returns (uint256);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function approve(address spender, uint256 value) external returns (bool);

  event Approval(address indexed owner, address indexed spender, uint256 value);
  event Transfer(address indexed from, address indexed to, uint256 value);
}
```
