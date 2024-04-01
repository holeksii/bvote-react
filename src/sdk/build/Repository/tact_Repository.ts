import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type DeployOrganization = {
    $$type: 'DeployOrganization';
    hidden: boolean;
}

export function storeDeployOrganization(src: DeployOrganization) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3207174752, 32);
        b_0.storeBit(src.hidden);
    };
}

export function loadDeployOrganization(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3207174752) { throw Error('Invalid prefix'); }
    let _hidden = sc_0.loadBit();
    return { $$type: 'DeployOrganization' as const, hidden: _hidden };
}

function loadTupleDeployOrganization(source: TupleReader) {
    let _hidden = source.readBoolean();
    return { $$type: 'DeployOrganization' as const, hidden: _hidden };
}

function storeTupleDeployOrganization(source: DeployOrganization) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.hidden);
    return builder.build();
}

function dictValueParserDeployOrganization(): DictionaryValue<DeployOrganization> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOrganization(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOrganization(src.loadRef().beginParse());
        }
    }
}

export type DeployOrganizationWithMetadata = {
    $$type: 'DeployOrganizationWithMetadata';
    hidden: boolean;
    metadata: Metadata;
}

export function storeDeployOrganizationWithMetadata(src: DeployOrganizationWithMetadata) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2019860049, 32);
        b_0.storeBit(src.hidden);
        b_0.store(storeMetadata(src.metadata));
    };
}

export function loadDeployOrganizationWithMetadata(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2019860049) { throw Error('Invalid prefix'); }
    let _hidden = sc_0.loadBit();
    let _metadata = loadMetadata(sc_0);
    return { $$type: 'DeployOrganizationWithMetadata' as const, hidden: _hidden, metadata: _metadata };
}

function loadTupleDeployOrganizationWithMetadata(source: TupleReader) {
    let _hidden = source.readBoolean();
    const _metadata = loadTupleMetadata(source.readTuple());
    return { $$type: 'DeployOrganizationWithMetadata' as const, hidden: _hidden, metadata: _metadata };
}

function storeTupleDeployOrganizationWithMetadata(source: DeployOrganizationWithMetadata) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.hidden);
    builder.writeTuple(storeTupleMetadata(source.metadata));
    return builder.build();
}

function dictValueParserDeployOrganizationWithMetadata(): DictionaryValue<DeployOrganizationWithMetadata> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOrganizationWithMetadata(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOrganizationWithMetadata(src.loadRef().beginParse());
        }
    }
}

export type SetDeployOrgFee = {
    $$type: 'SetDeployOrgFee';
    newFee: bigint;
}

export function storeSetDeployOrgFee(src: SetDeployOrgFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(155918963, 32);
        b_0.storeUint(src.newFee, 64);
    };
}

export function loadSetDeployOrgFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 155918963) { throw Error('Invalid prefix'); }
    let _newFee = sc_0.loadUintBig(64);
    return { $$type: 'SetDeployOrgFee' as const, newFee: _newFee };
}

function loadTupleSetDeployOrgFee(source: TupleReader) {
    let _newFee = source.readBigNumber();
    return { $$type: 'SetDeployOrgFee' as const, newFee: _newFee };
}

function storeTupleSetDeployOrgFee(source: SetDeployOrgFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.newFee);
    return builder.build();
}

function dictValueParserSetDeployOrgFee(): DictionaryValue<SetDeployOrgFee> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetDeployOrgFee(src)).endCell());
        },
        parse: (src) => {
            return loadSetDeployOrgFee(src.loadRef().beginParse());
        }
    }
}

export type Metadata = {
    $$type: 'Metadata';
    name: string;
    description: string;
    emoji: string;
    website: string;
}

export function storeMetadata(src: Metadata) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.name);
        b_0.storeStringRefTail(src.description);
        b_0.storeStringRefTail(src.emoji);
        let b_1 = new Builder();
        b_1.storeStringRefTail(src.website);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMetadata(slice: Slice) {
    let sc_0 = slice;
    let _name = sc_0.loadStringRefTail();
    let _description = sc_0.loadStringRefTail();
    let _emoji = sc_0.loadStringRefTail();
    let sc_1 = sc_0.loadRef().beginParse();
    let _website = sc_1.loadStringRefTail();
    return { $$type: 'Metadata' as const, name: _name, description: _description, emoji: _emoji, website: _website };
}

function loadTupleMetadata(source: TupleReader) {
    let _name = source.readString();
    let _description = source.readString();
    let _emoji = source.readString();
    let _website = source.readString();
    return { $$type: 'Metadata' as const, name: _name, description: _description, emoji: _emoji, website: _website };
}

function storeTupleMetadata(source: Metadata) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeString(source.description);
    builder.writeString(source.emoji);
    builder.writeString(source.website);
    return builder.build();
}

function dictValueParserMetadata(): DictionaryValue<Metadata> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMetadata(src)).endCell());
        },
        parse: (src) => {
            return loadMetadata(src.loadRef().beginParse());
        }
    }
}

export type InitOrganization = {
    $$type: 'InitOrganization';
    owner: Address;
    hidden: boolean;
}

export function storeInitOrganization(src: InitOrganization) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(181733061, 32);
        b_0.storeAddress(src.owner);
        b_0.storeBit(src.hidden);
    };
}

export function loadInitOrganization(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 181733061) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _hidden = sc_0.loadBit();
    return { $$type: 'InitOrganization' as const, owner: _owner, hidden: _hidden };
}

function loadTupleInitOrganization(source: TupleReader) {
    let _owner = source.readAddress();
    let _hidden = source.readBoolean();
    return { $$type: 'InitOrganization' as const, owner: _owner, hidden: _hidden };
}

function storeTupleInitOrganization(source: InitOrganization) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeBoolean(source.hidden);
    return builder.build();
}

function dictValueParserInitOrganization(): DictionaryValue<InitOrganization> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeInitOrganization(src)).endCell());
        },
        parse: (src) => {
            return loadInitOrganization(src.loadRef().beginParse());
        }
    }
}

export type InitOrganizationWithMetadata = {
    $$type: 'InitOrganizationWithMetadata';
    owner: Address;
    hidden: boolean;
    metadata: Metadata;
}

export function storeInitOrganizationWithMetadata(src: InitOrganizationWithMetadata) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3017949540, 32);
        b_0.storeAddress(src.owner);
        b_0.storeBit(src.hidden);
        b_0.store(storeMetadata(src.metadata));
    };
}

export function loadInitOrganizationWithMetadata(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3017949540) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _hidden = sc_0.loadBit();
    let _metadata = loadMetadata(sc_0);
    return { $$type: 'InitOrganizationWithMetadata' as const, owner: _owner, hidden: _hidden, metadata: _metadata };
}

function loadTupleInitOrganizationWithMetadata(source: TupleReader) {
    let _owner = source.readAddress();
    let _hidden = source.readBoolean();
    const _metadata = loadTupleMetadata(source.readTuple());
    return { $$type: 'InitOrganizationWithMetadata' as const, owner: _owner, hidden: _hidden, metadata: _metadata };
}

function storeTupleInitOrganizationWithMetadata(source: InitOrganizationWithMetadata) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeBoolean(source.hidden);
    builder.writeTuple(storeTupleMetadata(source.metadata));
    return builder.build();
}

function dictValueParserInitOrganizationWithMetadata(): DictionaryValue<InitOrganizationWithMetadata> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeInitOrganizationWithMetadata(src)).endCell());
        },
        parse: (src) => {
            return loadInitOrganizationWithMetadata(src.loadRef().beginParse());
        }
    }
}

export type DeployVoting = {
    $$type: 'DeployVoting';
    candidates: CandidateArray;
    voteFee: bigint;
    votesPerCandidate: bigint;
    startTime: bigint;
    timeToLive: bigint;
}

export function storeDeployVoting(src: DeployVoting) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3833162508, 32);
        b_0.store(storeCandidateArray(src.candidates));
        b_0.storeUint(src.voteFee, 64);
        b_0.storeUint(src.votesPerCandidate, 64);
        b_0.storeUint(src.startTime, 64);
        b_0.storeUint(src.timeToLive, 64);
    };
}

export function loadDeployVoting(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3833162508) { throw Error('Invalid prefix'); }
    let _candidates = loadCandidateArray(sc_0);
    let _voteFee = sc_0.loadUintBig(64);
    let _votesPerCandidate = sc_0.loadUintBig(64);
    let _startTime = sc_0.loadUintBig(64);
    let _timeToLive = sc_0.loadUintBig(64);
    return { $$type: 'DeployVoting' as const, candidates: _candidates, voteFee: _voteFee, votesPerCandidate: _votesPerCandidate, startTime: _startTime, timeToLive: _timeToLive };
}

function loadTupleDeployVoting(source: TupleReader) {
    const _candidates = loadTupleCandidateArray(source.readTuple());
    let _voteFee = source.readBigNumber();
    let _votesPerCandidate = source.readBigNumber();
    let _startTime = source.readBigNumber();
    let _timeToLive = source.readBigNumber();
    return { $$type: 'DeployVoting' as const, candidates: _candidates, voteFee: _voteFee, votesPerCandidate: _votesPerCandidate, startTime: _startTime, timeToLive: _timeToLive };
}

function storeTupleDeployVoting(source: DeployVoting) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleCandidateArray(source.candidates));
    builder.writeNumber(source.voteFee);
    builder.writeNumber(source.votesPerCandidate);
    builder.writeNumber(source.startTime);
    builder.writeNumber(source.timeToLive);
    return builder.build();
}

function dictValueParserDeployVoting(): DictionaryValue<DeployVoting> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployVoting(src)).endCell());
        },
        parse: (src) => {
            return loadDeployVoting(src.loadRef().beginParse());
        }
    }
}

export type DeployVotingWithMetadata = {
    $$type: 'DeployVotingWithMetadata';
    candidates: CandidateArray;
    voteFee: bigint;
    votesPerCandidate: bigint;
    startTime: bigint;
    timeToLive: bigint;
    metadata: Metadata;
}

export function storeDeployVotingWithMetadata(src: DeployVotingWithMetadata) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3149243131, 32);
        b_0.store(storeCandidateArray(src.candidates));
        b_0.storeUint(src.voteFee, 64);
        b_0.storeUint(src.votesPerCandidate, 64);
        b_0.storeUint(src.startTime, 64);
        b_0.storeUint(src.timeToLive, 64);
        let b_1 = new Builder();
        b_1.store(storeMetadata(src.metadata));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDeployVotingWithMetadata(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3149243131) { throw Error('Invalid prefix'); }
    let _candidates = loadCandidateArray(sc_0);
    let _voteFee = sc_0.loadUintBig(64);
    let _votesPerCandidate = sc_0.loadUintBig(64);
    let _startTime = sc_0.loadUintBig(64);
    let _timeToLive = sc_0.loadUintBig(64);
    let sc_1 = sc_0.loadRef().beginParse();
    let _metadata = loadMetadata(sc_1);
    return { $$type: 'DeployVotingWithMetadata' as const, candidates: _candidates, voteFee: _voteFee, votesPerCandidate: _votesPerCandidate, startTime: _startTime, timeToLive: _timeToLive, metadata: _metadata };
}

function loadTupleDeployVotingWithMetadata(source: TupleReader) {
    const _candidates = loadTupleCandidateArray(source.readTuple());
    let _voteFee = source.readBigNumber();
    let _votesPerCandidate = source.readBigNumber();
    let _startTime = source.readBigNumber();
    let _timeToLive = source.readBigNumber();
    const _metadata = loadTupleMetadata(source.readTuple());
    return { $$type: 'DeployVotingWithMetadata' as const, candidates: _candidates, voteFee: _voteFee, votesPerCandidate: _votesPerCandidate, startTime: _startTime, timeToLive: _timeToLive, metadata: _metadata };
}

function storeTupleDeployVotingWithMetadata(source: DeployVotingWithMetadata) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleCandidateArray(source.candidates));
    builder.writeNumber(source.voteFee);
    builder.writeNumber(source.votesPerCandidate);
    builder.writeNumber(source.startTime);
    builder.writeNumber(source.timeToLive);
    builder.writeTuple(storeTupleMetadata(source.metadata));
    return builder.build();
}

function dictValueParserDeployVotingWithMetadata(): DictionaryValue<DeployVotingWithMetadata> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployVotingWithMetadata(src)).endCell());
        },
        parse: (src) => {
            return loadDeployVotingWithMetadata(src.loadRef().beginParse());
        }
    }
}

export type SetDeployVotingFee = {
    $$type: 'SetDeployVotingFee';
    newFee: bigint;
}

export function storeSetDeployVotingFee(src: SetDeployVotingFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3911156721, 32);
        b_0.storeUint(src.newFee, 64);
    };
}

export function loadSetDeployVotingFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3911156721) { throw Error('Invalid prefix'); }
    let _newFee = sc_0.loadUintBig(64);
    return { $$type: 'SetDeployVotingFee' as const, newFee: _newFee };
}

function loadTupleSetDeployVotingFee(source: TupleReader) {
    let _newFee = source.readBigNumber();
    return { $$type: 'SetDeployVotingFee' as const, newFee: _newFee };
}

function storeTupleSetDeployVotingFee(source: SetDeployVotingFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.newFee);
    return builder.build();
}

function dictValueParserSetDeployVotingFee(): DictionaryValue<SetDeployVotingFee> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetDeployVotingFee(src)).endCell());
        },
        parse: (src) => {
            return loadSetDeployVotingFee(src.loadRef().beginParse());
        }
    }
}

export type OrganizationBasicInfo = {
    $$type: 'OrganizationBasicInfo';
    hidden: boolean;
    emoji: string;
    name: string;
    website: string;
}

export function storeOrganizationBasicInfo(src: OrganizationBasicInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.hidden);
        b_0.storeStringRefTail(src.emoji);
        b_0.storeStringRefTail(src.name);
        b_0.storeStringRefTail(src.website);
    };
}

export function loadOrganizationBasicInfo(slice: Slice) {
    let sc_0 = slice;
    let _hidden = sc_0.loadBit();
    let _emoji = sc_0.loadStringRefTail();
    let _name = sc_0.loadStringRefTail();
    let _website = sc_0.loadStringRefTail();
    return { $$type: 'OrganizationBasicInfo' as const, hidden: _hidden, emoji: _emoji, name: _name, website: _website };
}

function loadTupleOrganizationBasicInfo(source: TupleReader) {
    let _hidden = source.readBoolean();
    let _emoji = source.readString();
    let _name = source.readString();
    let _website = source.readString();
    return { $$type: 'OrganizationBasicInfo' as const, hidden: _hidden, emoji: _emoji, name: _name, website: _website };
}

function storeTupleOrganizationBasicInfo(source: OrganizationBasicInfo) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.hidden);
    builder.writeString(source.emoji);
    builder.writeString(source.name);
    builder.writeString(source.website);
    return builder.build();
}

function dictValueParserOrganizationBasicInfo(): DictionaryValue<OrganizationBasicInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeOrganizationBasicInfo(src)).endCell());
        },
        parse: (src) => {
            return loadOrganizationBasicInfo(src.loadRef().beginParse());
        }
    }
}

export type OrganizationAllInfo = {
    $$type: 'OrganizationAllInfo';
    owner: Address;
    hidden: boolean;
    emoji: string;
    name: string;
    description: string;
    website: string;
    numOfVotings: bigint;
}

export function storeOrganizationAllInfo(src: OrganizationAllInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeBit(src.hidden);
        b_0.storeStringRefTail(src.emoji);
        b_0.storeStringRefTail(src.name);
        b_0.storeStringRefTail(src.description);
        let b_1 = new Builder();
        b_1.storeStringRefTail(src.website);
        b_1.storeUint(src.numOfVotings, 64);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadOrganizationAllInfo(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _hidden = sc_0.loadBit();
    let _emoji = sc_0.loadStringRefTail();
    let _name = sc_0.loadStringRefTail();
    let _description = sc_0.loadStringRefTail();
    let sc_1 = sc_0.loadRef().beginParse();
    let _website = sc_1.loadStringRefTail();
    let _numOfVotings = sc_1.loadUintBig(64);
    return { $$type: 'OrganizationAllInfo' as const, owner: _owner, hidden: _hidden, emoji: _emoji, name: _name, description: _description, website: _website, numOfVotings: _numOfVotings };
}

function loadTupleOrganizationAllInfo(source: TupleReader) {
    let _owner = source.readAddress();
    let _hidden = source.readBoolean();
    let _emoji = source.readString();
    let _name = source.readString();
    let _description = source.readString();
    let _website = source.readString();
    let _numOfVotings = source.readBigNumber();
    return { $$type: 'OrganizationAllInfo' as const, owner: _owner, hidden: _hidden, emoji: _emoji, name: _name, description: _description, website: _website, numOfVotings: _numOfVotings };
}

function storeTupleOrganizationAllInfo(source: OrganizationAllInfo) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeBoolean(source.hidden);
    builder.writeString(source.emoji);
    builder.writeString(source.name);
    builder.writeString(source.description);
    builder.writeString(source.website);
    builder.writeNumber(source.numOfVotings);
    return builder.build();
}

function dictValueParserOrganizationAllInfo(): DictionaryValue<OrganizationAllInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeOrganizationAllInfo(src)).endCell());
        },
        parse: (src) => {
            return loadOrganizationAllInfo(src.loadRef().beginParse());
        }
    }
}

export type Candidate = {
    $$type: 'Candidate';
    name: string;
    info: string;
    votes: bigint;
}

export function storeCandidate(src: Candidate) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.name);
        b_0.storeStringRefTail(src.info);
        b_0.storeUint(src.votes, 64);
    };
}

export function loadCandidate(slice: Slice) {
    let sc_0 = slice;
    let _name = sc_0.loadStringRefTail();
    let _info = sc_0.loadStringRefTail();
    let _votes = sc_0.loadUintBig(64);
    return { $$type: 'Candidate' as const, name: _name, info: _info, votes: _votes };
}

function loadTupleCandidate(source: TupleReader) {
    let _name = source.readString();
    let _info = source.readString();
    let _votes = source.readBigNumber();
    return { $$type: 'Candidate' as const, name: _name, info: _info, votes: _votes };
}

function storeTupleCandidate(source: Candidate) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeString(source.info);
    builder.writeNumber(source.votes);
    return builder.build();
}

function dictValueParserCandidate(): DictionaryValue<Candidate> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCandidate(src)).endCell());
        },
        parse: (src) => {
            return loadCandidate(src.loadRef().beginParse());
        }
    }
}

export type CandidateArray = {
    $$type: 'CandidateArray';
    size: bigint;
    candidates: Dictionary<bigint, Candidate>;
}

export function storeCandidateArray(src: CandidateArray) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.size, 64);
        b_0.storeDict(src.candidates, Dictionary.Keys.BigUint(64), dictValueParserCandidate());
    };
}

export function loadCandidateArray(slice: Slice) {
    let sc_0 = slice;
    let _size = sc_0.loadUintBig(64);
    let _candidates = Dictionary.load(Dictionary.Keys.BigUint(64), dictValueParserCandidate(), sc_0);
    return { $$type: 'CandidateArray' as const, size: _size, candidates: _candidates };
}

function loadTupleCandidateArray(source: TupleReader) {
    let _size = source.readBigNumber();
    let _candidates = Dictionary.loadDirect(Dictionary.Keys.BigUint(64), dictValueParserCandidate(), source.readCellOpt());
    return { $$type: 'CandidateArray' as const, size: _size, candidates: _candidates };
}

function storeTupleCandidateArray(source: CandidateArray) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.size);
    builder.writeCell(source.candidates.size > 0 ? beginCell().storeDictDirect(source.candidates, Dictionary.Keys.BigUint(64), dictValueParserCandidate()).endCell() : null);
    return builder.build();
}

function dictValueParserCandidateArray(): DictionaryValue<CandidateArray> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCandidateArray(src)).endCell());
        },
        parse: (src) => {
            return loadCandidateArray(src.loadRef().beginParse());
        }
    }
}

export type VoteArray = {
    $$type: 'VoteArray';
    size: bigint;
    votesMap: Dictionary<bigint, bigint>;
}

export function storeVoteArray(src: VoteArray) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.size, 64);
        b_0.storeDict(src.votesMap, Dictionary.Keys.BigUint(64), Dictionary.Values.BigUint(64));
    };
}

export function loadVoteArray(slice: Slice) {
    let sc_0 = slice;
    let _size = sc_0.loadUintBig(64);
    let _votesMap = Dictionary.load(Dictionary.Keys.BigUint(64), Dictionary.Values.BigUint(64), sc_0);
    return { $$type: 'VoteArray' as const, size: _size, votesMap: _votesMap };
}

function loadTupleVoteArray(source: TupleReader) {
    let _size = source.readBigNumber();
    let _votesMap = Dictionary.loadDirect(Dictionary.Keys.BigUint(64), Dictionary.Values.BigUint(64), source.readCellOpt());
    return { $$type: 'VoteArray' as const, size: _size, votesMap: _votesMap };
}

function storeTupleVoteArray(source: VoteArray) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.size);
    builder.writeCell(source.votesMap.size > 0 ? beginCell().storeDictDirect(source.votesMap, Dictionary.Keys.BigUint(64), Dictionary.Values.BigUint(64)).endCell() : null);
    return builder.build();
}

function dictValueParserVoteArray(): DictionaryValue<VoteArray> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeVoteArray(src)).endCell());
        },
        parse: (src) => {
            return loadVoteArray(src.loadRef().beginParse());
        }
    }
}

export type InitVoting = {
    $$type: 'InitVoting';
    owner: Address;
    candidates: CandidateArray;
    voteFee: bigint;
    votesPerCandidate: bigint;
    startTime: bigint;
    timeToLive: bigint;
}

export function storeInitVoting(src: InitVoting) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4250906149, 32);
        b_0.storeAddress(src.owner);
        b_0.store(storeCandidateArray(src.candidates));
        b_0.storeUint(src.voteFee, 64);
        b_0.storeUint(src.votesPerCandidate, 64);
        b_0.storeUint(src.startTime, 64);
        b_0.storeUint(src.timeToLive, 64);
    };
}

export function loadInitVoting(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4250906149) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _candidates = loadCandidateArray(sc_0);
    let _voteFee = sc_0.loadUintBig(64);
    let _votesPerCandidate = sc_0.loadUintBig(64);
    let _startTime = sc_0.loadUintBig(64);
    let _timeToLive = sc_0.loadUintBig(64);
    return { $$type: 'InitVoting' as const, owner: _owner, candidates: _candidates, voteFee: _voteFee, votesPerCandidate: _votesPerCandidate, startTime: _startTime, timeToLive: _timeToLive };
}

function loadTupleInitVoting(source: TupleReader) {
    let _owner = source.readAddress();
    const _candidates = loadTupleCandidateArray(source.readTuple());
    let _voteFee = source.readBigNumber();
    let _votesPerCandidate = source.readBigNumber();
    let _startTime = source.readBigNumber();
    let _timeToLive = source.readBigNumber();
    return { $$type: 'InitVoting' as const, owner: _owner, candidates: _candidates, voteFee: _voteFee, votesPerCandidate: _votesPerCandidate, startTime: _startTime, timeToLive: _timeToLive };
}

function storeTupleInitVoting(source: InitVoting) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeTuple(storeTupleCandidateArray(source.candidates));
    builder.writeNumber(source.voteFee);
    builder.writeNumber(source.votesPerCandidate);
    builder.writeNumber(source.startTime);
    builder.writeNumber(source.timeToLive);
    return builder.build();
}

function dictValueParserInitVoting(): DictionaryValue<InitVoting> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeInitVoting(src)).endCell());
        },
        parse: (src) => {
            return loadInitVoting(src.loadRef().beginParse());
        }
    }
}

export type InitVotingWithMetadata = {
    $$type: 'InitVotingWithMetadata';
    owner: Address;
    candidates: CandidateArray;
    voteFee: bigint;
    votesPerCandidate: bigint;
    startTime: bigint;
    timeToLive: bigint;
    metadata: Metadata;
}

export function storeInitVotingWithMetadata(src: InitVotingWithMetadata) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(594339819, 32);
        b_0.storeAddress(src.owner);
        b_0.store(storeCandidateArray(src.candidates));
        b_0.storeUint(src.voteFee, 64);
        b_0.storeUint(src.votesPerCandidate, 64);
        b_0.storeUint(src.startTime, 64);
        b_0.storeUint(src.timeToLive, 64);
        let b_1 = new Builder();
        b_1.store(storeMetadata(src.metadata));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadInitVotingWithMetadata(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 594339819) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _candidates = loadCandidateArray(sc_0);
    let _voteFee = sc_0.loadUintBig(64);
    let _votesPerCandidate = sc_0.loadUintBig(64);
    let _startTime = sc_0.loadUintBig(64);
    let _timeToLive = sc_0.loadUintBig(64);
    let sc_1 = sc_0.loadRef().beginParse();
    let _metadata = loadMetadata(sc_1);
    return { $$type: 'InitVotingWithMetadata' as const, owner: _owner, candidates: _candidates, voteFee: _voteFee, votesPerCandidate: _votesPerCandidate, startTime: _startTime, timeToLive: _timeToLive, metadata: _metadata };
}

function loadTupleInitVotingWithMetadata(source: TupleReader) {
    let _owner = source.readAddress();
    const _candidates = loadTupleCandidateArray(source.readTuple());
    let _voteFee = source.readBigNumber();
    let _votesPerCandidate = source.readBigNumber();
    let _startTime = source.readBigNumber();
    let _timeToLive = source.readBigNumber();
    const _metadata = loadTupleMetadata(source.readTuple());
    return { $$type: 'InitVotingWithMetadata' as const, owner: _owner, candidates: _candidates, voteFee: _voteFee, votesPerCandidate: _votesPerCandidate, startTime: _startTime, timeToLive: _timeToLive, metadata: _metadata };
}

function storeTupleInitVotingWithMetadata(source: InitVotingWithMetadata) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeTuple(storeTupleCandidateArray(source.candidates));
    builder.writeNumber(source.voteFee);
    builder.writeNumber(source.votesPerCandidate);
    builder.writeNumber(source.startTime);
    builder.writeNumber(source.timeToLive);
    builder.writeTuple(storeTupleMetadata(source.metadata));
    return builder.build();
}

function dictValueParserInitVotingWithMetadata(): DictionaryValue<InitVotingWithMetadata> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeInitVotingWithMetadata(src)).endCell());
        },
        parse: (src) => {
            return loadInitVotingWithMetadata(src.loadRef().beginParse());
        }
    }
}

export type DeployAndCastVote = {
    $$type: 'DeployAndCastVote';
    candidateInd: bigint;
    numOfVotes: bigint;
}

export function storeDeployAndCastVote(src: DeployAndCastVote) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1355346110, 32);
        b_0.storeUint(src.candidateInd, 64);
        b_0.storeUint(src.numOfVotes, 64);
    };
}

export function loadDeployAndCastVote(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1355346110) { throw Error('Invalid prefix'); }
    let _candidateInd = sc_0.loadUintBig(64);
    let _numOfVotes = sc_0.loadUintBig(64);
    return { $$type: 'DeployAndCastVote' as const, candidateInd: _candidateInd, numOfVotes: _numOfVotes };
}

function loadTupleDeployAndCastVote(source: TupleReader) {
    let _candidateInd = source.readBigNumber();
    let _numOfVotes = source.readBigNumber();
    return { $$type: 'DeployAndCastVote' as const, candidateInd: _candidateInd, numOfVotes: _numOfVotes };
}

function storeTupleDeployAndCastVote(source: DeployAndCastVote) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.candidateInd);
    builder.writeNumber(source.numOfVotes);
    return builder.build();
}

function dictValueParserDeployAndCastVote(): DictionaryValue<DeployAndCastVote> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployAndCastVote(src)).endCell());
        },
        parse: (src) => {
            return loadDeployAndCastVote(src.loadRef().beginParse());
        }
    }
}

export type VotingBasicInfo = {
    $$type: 'VotingBasicInfo';
    emoji: string;
    name: string;
    startTime: bigint;
    endTime: bigint;
}

export function storeVotingBasicInfo(src: VotingBasicInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.emoji);
        b_0.storeStringRefTail(src.name);
        b_0.storeUint(src.startTime, 64);
        b_0.storeUint(src.endTime, 64);
    };
}

export function loadVotingBasicInfo(slice: Slice) {
    let sc_0 = slice;
    let _emoji = sc_0.loadStringRefTail();
    let _name = sc_0.loadStringRefTail();
    let _startTime = sc_0.loadUintBig(64);
    let _endTime = sc_0.loadUintBig(64);
    return { $$type: 'VotingBasicInfo' as const, emoji: _emoji, name: _name, startTime: _startTime, endTime: _endTime };
}

function loadTupleVotingBasicInfo(source: TupleReader) {
    let _emoji = source.readString();
    let _name = source.readString();
    let _startTime = source.readBigNumber();
    let _endTime = source.readBigNumber();
    return { $$type: 'VotingBasicInfo' as const, emoji: _emoji, name: _name, startTime: _startTime, endTime: _endTime };
}

function storeTupleVotingBasicInfo(source: VotingBasicInfo) {
    let builder = new TupleBuilder();
    builder.writeString(source.emoji);
    builder.writeString(source.name);
    builder.writeNumber(source.startTime);
    builder.writeNumber(source.endTime);
    return builder.build();
}

function dictValueParserVotingBasicInfo(): DictionaryValue<VotingBasicInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeVotingBasicInfo(src)).endCell());
        },
        parse: (src) => {
            return loadVotingBasicInfo(src.loadRef().beginParse());
        }
    }
}

export type VotingAllInfo = {
    $$type: 'VotingAllInfo';
    organization: Address;
    emoji: string;
    name: string;
    description: string;
    numOfVotes: bigint;
    voteFee: bigint;
    votesPerCandidate: bigint;
    startTime: bigint;
    endTime: bigint;
}

export function storeVotingAllInfo(src: VotingAllInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.organization);
        b_0.storeStringRefTail(src.emoji);
        b_0.storeStringRefTail(src.name);
        b_0.storeStringRefTail(src.description);
        b_0.storeUint(src.numOfVotes, 64);
        b_0.storeUint(src.voteFee, 64);
        b_0.storeUint(src.votesPerCandidate, 64);
        b_0.storeUint(src.startTime, 64);
        b_0.storeUint(src.endTime, 64);
    };
}

export function loadVotingAllInfo(slice: Slice) {
    let sc_0 = slice;
    let _organization = sc_0.loadAddress();
    let _emoji = sc_0.loadStringRefTail();
    let _name = sc_0.loadStringRefTail();
    let _description = sc_0.loadStringRefTail();
    let _numOfVotes = sc_0.loadUintBig(64);
    let _voteFee = sc_0.loadUintBig(64);
    let _votesPerCandidate = sc_0.loadUintBig(64);
    let _startTime = sc_0.loadUintBig(64);
    let _endTime = sc_0.loadUintBig(64);
    return { $$type: 'VotingAllInfo' as const, organization: _organization, emoji: _emoji, name: _name, description: _description, numOfVotes: _numOfVotes, voteFee: _voteFee, votesPerCandidate: _votesPerCandidate, startTime: _startTime, endTime: _endTime };
}

function loadTupleVotingAllInfo(source: TupleReader) {
    let _organization = source.readAddress();
    let _emoji = source.readString();
    let _name = source.readString();
    let _description = source.readString();
    let _numOfVotes = source.readBigNumber();
    let _voteFee = source.readBigNumber();
    let _votesPerCandidate = source.readBigNumber();
    let _startTime = source.readBigNumber();
    let _endTime = source.readBigNumber();
    return { $$type: 'VotingAllInfo' as const, organization: _organization, emoji: _emoji, name: _name, description: _description, numOfVotes: _numOfVotes, voteFee: _voteFee, votesPerCandidate: _votesPerCandidate, startTime: _startTime, endTime: _endTime };
}

function storeTupleVotingAllInfo(source: VotingAllInfo) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.organization);
    builder.writeString(source.emoji);
    builder.writeString(source.name);
    builder.writeString(source.description);
    builder.writeNumber(source.numOfVotes);
    builder.writeNumber(source.voteFee);
    builder.writeNumber(source.votesPerCandidate);
    builder.writeNumber(source.startTime);
    builder.writeNumber(source.endTime);
    return builder.build();
}

function dictValueParserVotingAllInfo(): DictionaryValue<VotingAllInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeVotingAllInfo(src)).endCell());
        },
        parse: (src) => {
            return loadVotingAllInfo(src.loadRef().beginParse());
        }
    }
}

export type CastVote = {
    $$type: 'CastVote';
    owner: Address;
    candidateInd: bigint;
    numOfVotes: bigint;
}

export function storeCastVote(src: CastVote) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3093652763, 32);
        b_0.storeAddress(src.owner);
        b_0.storeUint(src.candidateInd, 64);
        b_0.storeUint(src.numOfVotes, 64);
    };
}

export function loadCastVote(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3093652763) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _candidateInd = sc_0.loadUintBig(64);
    let _numOfVotes = sc_0.loadUintBig(64);
    return { $$type: 'CastVote' as const, owner: _owner, candidateInd: _candidateInd, numOfVotes: _numOfVotes };
}

function loadTupleCastVote(source: TupleReader) {
    let _owner = source.readAddress();
    let _candidateInd = source.readBigNumber();
    let _numOfVotes = source.readBigNumber();
    return { $$type: 'CastVote' as const, owner: _owner, candidateInd: _candidateInd, numOfVotes: _numOfVotes };
}

function storeTupleCastVote(source: CastVote) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeNumber(source.candidateInd);
    builder.writeNumber(source.numOfVotes);
    return builder.build();
}

function dictValueParserCastVote(): DictionaryValue<CastVote> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCastVote(src)).endCell());
        },
        parse: (src) => {
            return loadCastVote(src.loadRef().beginParse());
        }
    }
}

 type Repository_init_args = {
    $$type: 'Repository_init_args';
    repositoryId: bigint;
}

function initRepository_init_args(src: Repository_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.repositoryId, 257);
    };
}

async function Repository_init(repositoryId: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initRepository_init_args({ $$type: 'Repository_init_args', repositoryId })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Repository_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    13397: { message: `Invalid number of votes` },
    24647: { message: `Only repository can deploy organization` },
    26215: { message: `Only the owner can cast votes` },
    26998: { message: `Not enough value to deploy voting` },
    27884: { message: `Insufficient funds to deploy organization` },
    28869: { message: `Votes already casted` },
    34218: { message: `Only the organization can deploy the voting contract` },
    37618: { message: `Only the voting contract can deploy this contract` },
    38223: { message: `Start time should be in the future` },
    51754: { message: `Insufficient funds` },
    54147: { message: `Voting has not started yet` },
    59195: { message: `Voting has ended` },
}

const Repository_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"DeployOrganization","header":3207174752,"fields":[{"name":"hidden","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployOrganizationWithMetadata","header":2019860049,"fields":[{"name":"hidden","type":{"kind":"simple","type":"bool","optional":false}},{"name":"metadata","type":{"kind":"simple","type":"Metadata","optional":false}}]},
    {"name":"SetDeployOrgFee","header":155918963,"fields":[{"name":"newFee","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"Metadata","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}},{"name":"emoji","type":{"kind":"simple","type":"string","optional":false}},{"name":"website","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"InitOrganization","header":181733061,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"hidden","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"InitOrganizationWithMetadata","header":3017949540,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"hidden","type":{"kind":"simple","type":"bool","optional":false}},{"name":"metadata","type":{"kind":"simple","type":"Metadata","optional":false}}]},
    {"name":"DeployVoting","header":3833162508,"fields":[{"name":"candidates","type":{"kind":"simple","type":"CandidateArray","optional":false}},{"name":"voteFee","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"votesPerCandidate","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"startTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"timeToLive","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployVotingWithMetadata","header":3149243131,"fields":[{"name":"candidates","type":{"kind":"simple","type":"CandidateArray","optional":false}},{"name":"voteFee","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"votesPerCandidate","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"startTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"timeToLive","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"metadata","type":{"kind":"simple","type":"Metadata","optional":false}}]},
    {"name":"SetDeployVotingFee","header":3911156721,"fields":[{"name":"newFee","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"OrganizationBasicInfo","header":null,"fields":[{"name":"hidden","type":{"kind":"simple","type":"bool","optional":false}},{"name":"emoji","type":{"kind":"simple","type":"string","optional":false}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"website","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"OrganizationAllInfo","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"hidden","type":{"kind":"simple","type":"bool","optional":false}},{"name":"emoji","type":{"kind":"simple","type":"string","optional":false}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}},{"name":"website","type":{"kind":"simple","type":"string","optional":false}},{"name":"numOfVotings","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"Candidate","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"info","type":{"kind":"simple","type":"string","optional":false}},{"name":"votes","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CandidateArray","header":null,"fields":[{"name":"size","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"candidates","type":{"kind":"dict","key":"uint","keyFormat":64,"value":"Candidate","valueFormat":"ref"}}]},
    {"name":"VoteArray","header":null,"fields":[{"name":"size","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"votesMap","type":{"kind":"dict","key":"uint","keyFormat":64,"value":"uint","valueFormat":64}}]},
    {"name":"InitVoting","header":4250906149,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"candidates","type":{"kind":"simple","type":"CandidateArray","optional":false}},{"name":"voteFee","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"votesPerCandidate","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"startTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"timeToLive","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"InitVotingWithMetadata","header":594339819,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"candidates","type":{"kind":"simple","type":"CandidateArray","optional":false}},{"name":"voteFee","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"votesPerCandidate","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"startTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"timeToLive","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"metadata","type":{"kind":"simple","type":"Metadata","optional":false}}]},
    {"name":"DeployAndCastVote","header":1355346110,"fields":[{"name":"candidateInd","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"numOfVotes","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"VotingBasicInfo","header":null,"fields":[{"name":"emoji","type":{"kind":"simple","type":"string","optional":false}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"startTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"endTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"VotingAllInfo","header":null,"fields":[{"name":"organization","type":{"kind":"simple","type":"address","optional":false}},{"name":"emoji","type":{"kind":"simple","type":"string","optional":false}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}},{"name":"numOfVotes","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"voteFee","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"votesPerCandidate","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"startTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"endTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CastVote","header":3093652763,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"candidateInd","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"numOfVotes","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
]

const Repository_getters: ABIGetter[] = [
    {"name":"numOfOrganizations","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"deployOrganizationFee","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"organizationAddress","arguments":[{"name":"organizationId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const Repository_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DeployOrganization"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DeployOrganizationWithMetadata"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetDeployOrgFee"}},
    {"receiver":"internal","message":{"kind":"text","text":"withdraw all"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Repository implements Contract {
    
    static async init(repositoryId: bigint) {
        return await Repository_init(repositoryId);
    }
    
    static async fromInit(repositoryId: bigint) {
        const init = await Repository_init(repositoryId);
        const address = contractAddress(0, init);
        return new Repository(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Repository(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Repository_types,
        getters: Repository_getters,
        receivers: Repository_receivers,
        errors: Repository_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | DeployOrganization | DeployOrganizationWithMetadata | SetDeployOrgFee | 'withdraw all' | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeployOrganization') {
            body = beginCell().store(storeDeployOrganization(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeployOrganizationWithMetadata') {
            body = beginCell().store(storeDeployOrganizationWithMetadata(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetDeployOrgFee') {
            body = beginCell().store(storeSetDeployOrgFee(message)).endCell();
        }
        if (message === 'withdraw all') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getNumOfOrganizations(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('numOfOrganizations', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getDeployOrganizationFee(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('deployOrganizationFee', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getOrganizationAddress(provider: ContractProvider, organizationId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(organizationId);
        let source = (await provider.get('organizationAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}