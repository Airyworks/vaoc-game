export const PLAYER_SPEED = 3 // pixels per frame

export const STAGE_WIDTH = 800
export const STAGE_HEIGHT = 600
export const GRID_WIDTH = 64
export const GRID_HEIGHT = 64
export const RESERVE_WIDTH = 400
export const RESERVE_HEIGHT = 300

export const KEYBOARD_SETTING = {
  Left: 'ArrowLeft',
  Right: 'ArrowRight',
  Up: 'ArrowUp',
  Down: 'ArrowDown'
}

export const VEB3_CONFIG = {
  START_BLOCK_NUMBER: 0,
  INTERVAL_PER_IDER: 5,
  DEFAULT_PROVIDER: 'http://39.105.126.32:12450',
  KURO_ADDRESS: '0x21b385c85ed7BDF4b2a29Ad34d570cfd9ef29506',
  SHIRO_ADDRESS: '0xf8a16788b7f2BF063E2A4Bc91bC986ccaCD58737',
  // tslint:disable-next-line
  KURO_ABI: [{constant:false,inputs:[],name:'getNewToken',outputs:[],payable:false,stateMutability:'nonpayable',type:'function',signature:'0x069d3180'},{constant:true,inputs:[],name:'name',outputs:[{name:'',type:'string'}],payable:false,stateMutability:'view',type:'function',signature:'0x06fdde03'},{constant:true,inputs:[{name:'_tokenId',type:'uint256'}],name:'getApproved',outputs:[{name:'',type:'address'}],payable:false,stateMutability:'view',type:'function',signature:'0x081812fc'},{constant:false,inputs:[{name:'_to',type:'address'},{name:'_tokenId',type:'uint256'}],name:'approve',outputs:[],payable:false,stateMutability:'nonpayable',type:'function',signature:'0x095ea7b3'},{constant:true,inputs:[{name:'_to',type:'address',isCorrect:true},{name:'start',type:'uint256',isCorrect:true},{name:'end',type:'uint256',isCorrect:true}],name:'getOwnerTokens',outputs:[{name:'',type:'uint256[]'}],payable:false,stateMutability:'view',type:'function',signature:'0x1f0cc874'},{constant:false,inputs:[{name:'_shiro',type:'address',isCorrect:true}],name:'setSHIRO',outputs:[],payable:false,stateMutability:'nonpayable',type:'function',signature:'0x221c4e7e'},{constant:false,inputs:[{name:'_from',type:'address'},{name:'_to',type:'address'},{name:'_tokenId',type:'uint256'}],name:'transferFrom',outputs:[],payable:false,stateMutability:'nonpayable',type:'function',signature:'0x23b872dd'},{constant:true,inputs:[],name:'founder',outputs:[{name:'',type:'address'}],payable:false,stateMutability:'view',type:'function',signature:'0x4d853ee5'},{constant:true,inputs:[{name:'_tokenId',type:'uint256'}],name:'exists',outputs:[{name:'',type:'bool'}],payable:false,stateMutability:'view',type:'function',signature:'0x4f558e79'},{constant:true,inputs:[],name:'SHIRO',outputs:[{name:'',type:'address'}],payable:false,stateMutability:'view',type:'function',signature:'0x5f3e1d32'},{constant:true,inputs:[{name:'_tokenId',type:'uint256'}],name:'ownerOf',outputs:[{name:'',type:'address'}],payable:false,stateMutability:'view',type:'function',signature:'0x6352211e'},{constant:true,inputs:[{name:'_owner',type:'address',isCorrect:true}],name:'balanceOf',outputs:[{name:'',type:'uint256'}],payable:false,stateMutability:'view',type:'function',signature:'0x70a08231'},{constant:true,inputs:[],name:'symbol',outputs:[{name:'',type:'string'}],payable:false,stateMutability:'view',type:'function',signature:'0x95d89b41'},{constant:true,inputs:[],name:'spendABI',outputs:[{name:'',type:'bytes4'}],payable:false,stateMutability:'view',type:'function',signature:'0x95f530c0'},{constant:false,inputs:[{name:'_to',type:'address'},{name:'_approved',type:'bool'}],name:'setApprovalForAll',outputs:[],payable:false,stateMutability:'nonpayable',type:'function',signature:'0xa22cb465'},{constant:true,inputs:[{name:'_owner',type:'address'},{name:'_operator',type:'address'}],name:'isApprovedForAll',outputs:[{name:'',type:'bool'}],payable:false,stateMutability:'view',type:'function',signature:'0xe985e9c5'},{inputs:[],payable:false,stateMutability:'nonpayable',type:'constructor'},{anonymous:false,inputs:[{indexed:true,name:'_from',type:'address'},{indexed:true,name:'_to',type:'address'},{indexed:false,name:'_tokenId',type:'uint256'}],name:'Transfer',type:'event',signature:'0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'},{anonymous:false,inputs:[{indexed:true,name:'_owner',type:'address'},{indexed:true,name:'_approved',type:'address'},{indexed:false,name:'_tokenId',type:'uint256'}],name:'Approval',type:'event',signature:'0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'},{anonymous:false,inputs:[{indexed:true,name:'_owner',type:'address'},{indexed:true,name:'_operator',type:'address'},{indexed:false,name:'_approved',type:'bool'}],name:'ApprovalForAll',type:'event',signature:'0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31'}],
  // tslint:disable-next-line
  SHIRO_ABI: [{constant:true,inputs:[],name:'name',outputs:[{name:'',type:'string'}],payable:false,stateMutability:'view',type:'function',signature:'0x06fdde03'},{constant:false,inputs:[{name:'_spender',type:'address'},{name:'_value',type:'uint256'}],name:'approve',outputs:[{name:'',type:'bool'}],payable:false,stateMutability:'nonpayable',type:'function',signature:'0x095ea7b3'},{constant:true,inputs:[],name:'totalSupply',outputs:[{name:'supply',type:'uint256'}],payable:false,stateMutability:'view',type:'function',signature:'0x18160ddd'},{constant:false,inputs:[{name:'_from',type:'address'},{name:'_to',type:'address'},{name:'_value',type:'uint256'}],name:'transferFrom',outputs:[{name:'',type:'bool'}],payable:false,stateMutability:'nonpayable',type:'function',signature:'0x23b872dd'},{constant:true,inputs:[],name:'decimals',outputs:[{name:'',type:'uint256'}],payable:false,stateMutability:'view',type:'function',signature:'0x313ce567'},{constant:true,inputs:[],name:'founder',outputs:[{name:'',type:'address'}],payable:false,stateMutability:'view',type:'function',signature:'0x4d853ee5'},{constant:true,inputs:[{name:'_owner',type:'address',isCorrect:true}],name:'balanceOf',outputs:[{name:'',type:'uint256'}],payable:false,stateMutability:'view',type:'function',signature:'0x70a08231'},{constant:false,inputs:[{name:'newFounder',type:'address'}],name:'changeFounder',outputs:[],payable:false,stateMutability:'nonpayable',type:'function',signature:'0x93c32e06'},{constant:true,inputs:[],name:'symbol',outputs:[{name:'',type:'string'}],payable:false,stateMutability:'view',type:'function',signature:'0x95d89b41'},{constant:false,inputs:[{name:'_to',type:'address'},{name:'_value',type:'uint256'}],name:'transfer',outputs:[{name:'',type:'bool'}],payable:false,stateMutability:'nonpayable',type:'function',signature:'0xa9059cbb'},{constant:false,inputs:[{name:'_from',type:'address'},{name:'_value',type:'uint256'}],name:'spend',outputs:[],payable:false,stateMutability:'nonpayable',type:'function',signature:'0xaf7d6ca3'},{constant:false,inputs:[{name:'_tos',type:'address[]'},{name:'_values',type:'uint256[]'}],name:'distributeMultiple',outputs:[{name:'',type:'bool'}],payable:false,stateMutability:'nonpayable',type:'function',signature:'0xb319e9fa'},{constant:true,inputs:[{name:'_owner',type:'address'},{name:'_spender',type:'address'}],name:'allowance',outputs:[{name:'',type:'uint256'}],payable:false,stateMutability:'view',type:'function',signature:'0xdd62ed3e'},{constant:true,inputs:[],name:'distributed',outputs:[{name:'',type:'uint256'}],payable:false,stateMutability:'view',type:'function',signature:'0xf84b903e'},{constant:false,inputs:[{name:'_to',type:'address'},{name:'_amount',type:'uint256'}],name:'distribute',outputs:[{name:'',type:'bool'}],payable:false,stateMutability:'nonpayable',type:'function',signature:'0xfb932108'},{inputs:[],payable:false,stateMutability:'nonpayable',type:'constructor'},{anonymous:false,inputs:[{indexed:true,name:'_from',type:'address'},{indexed:true,name:'_to',type:'address'},{indexed:false,name:'_value',type:'uint256'}],name:'Transfer',type:'event',signature:'0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'},{anonymous:false,inputs:[{indexed:true,name:'_owner',type:'address'},{indexed:true,name:'_spender',type:'address'},{indexed:false,name:'_value',type:'uint256'}],name:'Approval',type:'event',signature:'0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'}]
}

export const DIALOG_TITLE_STYLE = {
  fontFamily: '楷体',
  fontSize: 25,
  fill: ['#fff'],
  stroke: '#333',
  strokeThickness: 4,
  wordWrap: true,
  wordWrapWidth: 600
}

export const DIALOG_WORD_STYLE = {
  fontFamily: '楷体',
  fontSize: 20,
  fill: ['#fff'],
  stroke: '#333',
  strokeThickness: 4,
  letterSpacing: 4,
  wordWrap: true,
  breakWords: true,
  wordWrapWidth: 700
}

export const CARD_TITLE_WORD_STYLE = {
  // fontFamily: '楷体',
  fontSize: 12,
  fill: ['#fff'],
  stroke: '#333',
  strokeThickness: 3,
  letterSpacing: 2,
  wordWrap: true,
  breakWords: true,
  wordWrapWidth: 700
}

export const CARD_ATTR_WORD_STYLE = {
  // fontFamily: '楷体',
  fontSize: 10,
  fill: ['#fff'],
  stroke: '#333',
  strokeThickness: 2,
  letterSpacing: 2,
  wordWrap: true,
  breakWords: true,
  wordWrapWidth: 700
}

export const DIALOG_SPEED = 50 // 50 ms
