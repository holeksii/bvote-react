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

export type InitOrganization = {
    $$type: 'InitOrganization';
    owner: Address;
}

export function storeInitOrganization(src: InitOrganization) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2483039406, 32);
        b_0.storeAddress(src.owner);
    };
}

export function loadInitOrganization(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2483039406) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    return { $$type: 'InitOrganization' as const, owner: _owner };
}

function loadTupleInitOrganization(source: TupleReader) {
    let _owner = source.readAddress();
    return { $$type: 'InitOrganization' as const, owner: _owner };
}

function storeTupleInitOrganization(source: InitOrganization) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
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
    metadata: Metadata;
}

export function storeInitOrganizationWithMetadata(src: InitOrganizationWithMetadata) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3404583615, 32);
        b_0.storeAddress(src.owner);
        b_0.store(storeMetadata(src.metadata));
    };
}

export function loadInitOrganizationWithMetadata(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3404583615) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _metadata = loadMetadata(sc_0);
    return { $$type: 'InitOrganizationWithMetadata' as const, owner: _owner, metadata: _metadata };
}

function loadTupleInitOrganizationWithMetadata(source: TupleReader) {
    let _owner = source.readAddress();
    const _metadata = loadTupleMetadata(source.readTuple());
    return { $$type: 'InitOrganizationWithMetadata' as const, owner: _owner, metadata: _metadata };
}

function storeTupleInitOrganizationWithMetadata(source: InitOrganizationWithMetadata) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
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
        b_0.storeUint(2352013716, 32);
        b_0.store(storeCandidateArray(src.candidates));
        b_0.storeUint(src.voteFee, 64);
        b_0.storeUint(src.votesPerCandidate, 8);
        b_0.storeUint(src.startTime, 64);
        b_0.storeUint(src.timeToLive, 64);
    };
}

export function loadDeployVoting(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2352013716) { throw Error('Invalid prefix'); }
    let _candidates = loadCandidateArray(sc_0);
    let _voteFee = sc_0.loadUintBig(64);
    let _votesPerCandidate = sc_0.loadUintBig(8);
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
        b_0.storeUint(3253980079, 32);
        b_0.store(storeCandidateArray(src.candidates));
        b_0.storeUint(src.voteFee, 64);
        b_0.storeUint(src.votesPerCandidate, 8);
        b_0.storeUint(src.startTime, 64);
        b_0.storeUint(src.timeToLive, 64);
        let b_1 = new Builder();
        b_1.store(storeMetadata(src.metadata));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDeployVotingWithMetadata(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3253980079) { throw Error('Invalid prefix'); }
    let _candidates = loadCandidateArray(sc_0);
    let _voteFee = sc_0.loadUintBig(64);
    let _votesPerCandidate = sc_0.loadUintBig(8);
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
    emoji: string;
    name: string;
    website: string;
}

export function storeOrganizationBasicInfo(src: OrganizationBasicInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.emoji);
        b_0.storeStringRefTail(src.name);
        b_0.storeStringRefTail(src.website);
    };
}

export function loadOrganizationBasicInfo(slice: Slice) {
    let sc_0 = slice;
    let _emoji = sc_0.loadStringRefTail();
    let _name = sc_0.loadStringRefTail();
    let _website = sc_0.loadStringRefTail();
    return { $$type: 'OrganizationBasicInfo' as const, emoji: _emoji, name: _name, website: _website };
}

function loadTupleOrganizationBasicInfo(source: TupleReader) {
    let _emoji = source.readString();
    let _name = source.readString();
    let _website = source.readString();
    return { $$type: 'OrganizationBasicInfo' as const, emoji: _emoji, name: _name, website: _website };
}

function storeTupleOrganizationBasicInfo(source: OrganizationBasicInfo) {
    let builder = new TupleBuilder();
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
    let _emoji = sc_0.loadStringRefTail();
    let _name = sc_0.loadStringRefTail();
    let _description = sc_0.loadStringRefTail();
    let sc_1 = sc_0.loadRef().beginParse();
    let _website = sc_1.loadStringRefTail();
    let _numOfVotings = sc_1.loadUintBig(64);
    return { $$type: 'OrganizationAllInfo' as const, owner: _owner, emoji: _emoji, name: _name, description: _description, website: _website, numOfVotings: _numOfVotings };
}

function loadTupleOrganizationAllInfo(source: TupleReader) {
    let _owner = source.readAddress();
    let _emoji = source.readString();
    let _name = source.readString();
    let _description = source.readString();
    let _website = source.readString();
    let _numOfVotings = source.readBigNumber();
    return { $$type: 'OrganizationAllInfo' as const, owner: _owner, emoji: _emoji, name: _name, description: _description, website: _website, numOfVotings: _numOfVotings };
}

function storeTupleOrganizationAllInfo(source: OrganizationAllInfo) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
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
        b_0.storeUint(src.size, 8);
        b_0.storeDict(src.candidates, Dictionary.Keys.BigUint(64), dictValueParserCandidate());
    };
}

export function loadCandidateArray(slice: Slice) {
    let sc_0 = slice;
    let _size = sc_0.loadUintBig(8);
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
        b_0.storeUint(4246717119, 32);
        b_0.storeAddress(src.owner);
        b_0.store(storeCandidateArray(src.candidates));
        b_0.storeUint(src.voteFee, 64);
        b_0.storeUint(src.votesPerCandidate, 8);
        b_0.storeUint(src.startTime, 64);
        b_0.storeUint(src.timeToLive, 64);
    };
}

export function loadInitVoting(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4246717119) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _candidates = loadCandidateArray(sc_0);
    let _voteFee = sc_0.loadUintBig(64);
    let _votesPerCandidate = sc_0.loadUintBig(8);
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
        b_0.storeUint(3692900348, 32);
        b_0.storeAddress(src.owner);
        b_0.store(storeCandidateArray(src.candidates));
        b_0.storeUint(src.voteFee, 64);
        b_0.storeUint(src.votesPerCandidate, 8);
        b_0.storeUint(src.startTime, 64);
        b_0.storeUint(src.timeToLive, 64);
        let b_1 = new Builder();
        b_1.store(storeMetadata(src.metadata));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadInitVotingWithMetadata(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3692900348) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _candidates = loadCandidateArray(sc_0);
    let _voteFee = sc_0.loadUintBig(64);
    let _votesPerCandidate = sc_0.loadUintBig(8);
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
        b_0.storeUint(1642098951, 32);
        b_0.storeUint(src.candidateInd, 8);
        b_0.storeUint(src.numOfVotes, 8);
    };
}

export function loadDeployAndCastVote(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1642098951) { throw Error('Invalid prefix'); }
    let _candidateInd = sc_0.loadUintBig(8);
    let _numOfVotes = sc_0.loadUintBig(8);
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

export type DeployAndCastVoteOk = {
    $$type: 'DeployAndCastVoteOk';
    voter: Address;
    candidateInd: bigint;
    numOfVotes: bigint;
}

export function storeDeployAndCastVoteOk(src: DeployAndCastVoteOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4128084533, 32);
        b_0.storeAddress(src.voter);
        b_0.storeUint(src.candidateInd, 8);
        b_0.storeUint(src.numOfVotes, 8);
    };
}

export function loadDeployAndCastVoteOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4128084533) { throw Error('Invalid prefix'); }
    let _voter = sc_0.loadAddress();
    let _candidateInd = sc_0.loadUintBig(8);
    let _numOfVotes = sc_0.loadUintBig(8);
    return { $$type: 'DeployAndCastVoteOk' as const, voter: _voter, candidateInd: _candidateInd, numOfVotes: _numOfVotes };
}

function loadTupleDeployAndCastVoteOk(source: TupleReader) {
    let _voter = source.readAddress();
    let _candidateInd = source.readBigNumber();
    let _numOfVotes = source.readBigNumber();
    return { $$type: 'DeployAndCastVoteOk' as const, voter: _voter, candidateInd: _candidateInd, numOfVotes: _numOfVotes };
}

function storeTupleDeployAndCastVoteOk(source: DeployAndCastVoteOk) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.voter);
    builder.writeNumber(source.candidateInd);
    builder.writeNumber(source.numOfVotes);
    return builder.build();
}

function dictValueParserDeployAndCastVoteOk(): DictionaryValue<DeployAndCastVoteOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployAndCastVoteOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployAndCastVoteOk(src.loadRef().beginParse());
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
    owner: Address;
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
        b_0.storeAddress(src.owner);
        b_0.storeStringRefTail(src.emoji);
        b_0.storeStringRefTail(src.name);
        b_0.storeStringRefTail(src.description);
        b_0.storeUint(src.numOfVotes, 64);
        b_0.storeUint(src.voteFee, 64);
        b_0.storeUint(src.votesPerCandidate, 8);
        b_0.storeUint(src.startTime, 64);
        b_0.storeUint(src.endTime, 64);
    };
}

export function loadVotingAllInfo(slice: Slice) {
    let sc_0 = slice;
    let _organization = sc_0.loadAddress();
    let _owner = sc_0.loadAddress();
    let _emoji = sc_0.loadStringRefTail();
    let _name = sc_0.loadStringRefTail();
    let _description = sc_0.loadStringRefTail();
    let _numOfVotes = sc_0.loadUintBig(64);
    let _voteFee = sc_0.loadUintBig(64);
    let _votesPerCandidate = sc_0.loadUintBig(8);
    let _startTime = sc_0.loadUintBig(64);
    let _endTime = sc_0.loadUintBig(64);
    return { $$type: 'VotingAllInfo' as const, organization: _organization, owner: _owner, emoji: _emoji, name: _name, description: _description, numOfVotes: _numOfVotes, voteFee: _voteFee, votesPerCandidate: _votesPerCandidate, startTime: _startTime, endTime: _endTime };
}

function loadTupleVotingAllInfo(source: TupleReader) {
    let _organization = source.readAddress();
    let _owner = source.readAddress();
    let _emoji = source.readString();
    let _name = source.readString();
    let _description = source.readString();
    let _numOfVotes = source.readBigNumber();
    let _voteFee = source.readBigNumber();
    let _votesPerCandidate = source.readBigNumber();
    let _startTime = source.readBigNumber();
    let _endTime = source.readBigNumber();
    return { $$type: 'VotingAllInfo' as const, organization: _organization, owner: _owner, emoji: _emoji, name: _name, description: _description, numOfVotes: _numOfVotes, voteFee: _voteFee, votesPerCandidate: _votesPerCandidate, startTime: _startTime, endTime: _endTime };
}

function storeTupleVotingAllInfo(source: VotingAllInfo) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.organization);
    builder.writeAddress(source.owner);
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
        b_0.storeUint(1300754827, 32);
        b_0.storeAddress(src.owner);
        b_0.storeUint(src.candidateInd, 8);
        b_0.storeUint(src.numOfVotes, 8);
    };
}

export function loadCastVote(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1300754827) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _candidateInd = sc_0.loadUintBig(8);
    let _numOfVotes = sc_0.loadUintBig(8);
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

 type Voting_init_args = {
    $$type: 'Voting_init_args';
    organization: Address;
    votingId: bigint;
}

function initVoting_init_args(src: Voting_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.organization);
        b_0.storeInt(src.votingId, 257);
    };
}

async function Voting_init(organization: Address, votingId: bigint) {
    const __code = Cell.fromBase64('te6ccgECRgEACh8AART/APSkE/S88sgLAQIBYgIDA5rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVHNs88uCCyPhDAcx/AcoAVcDbPMntVEISEwIBIAQFAgEgBgcCASAkJQICcwgJAgEgCwwCEKu82zzbPGzRQkACEKun2zzbPGzRQgoAAisCEbSju2ebZ42aMEINAgFIDg8AAiwCEa9Z7Z5tnjZqQEIQAhGsvW2ebZ42akBCEQAIVHdlJwAOXKBUZpBSQAS+7aLt+wGSMH/gcCHXScIflTAg1wsf3iDAACLXScEhsJJbf+AgghD9H8K/uo+pMNs8bBc3Nzc3Ozs9+EFvJBNfA4IQBfXhAKFwcIgvVTAQJBAjbW3bPH/gIIIQ3B0v/LoUFyEVAfZQ3CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAKINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WGMs/QGUCywf0AMhQRAXIUATPFslQBMzIWM8WyQHMyFADzxbJWMzIyFADzxbJWMzJAcwSyz8SywcTyz8jAH7THwGCEP0fwr+68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTB/QEWQLTP9MH0z/TPwcGVTAEdI+vMNs8bBs7Ozs7Ozs7Ozs7PfhBbyQTXwOCEAX14QChcHCIL1UwECQQI21t2zxVM3/gIIIQYeBxB7oWFyEYAMTTHwGCENwdL/y68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTB/QEWQLTP9MH0z/TP9QB0NQB0AHUAdAB1AHQAdQB0NQw0BRDMDQQSxBKEEgQRxBGEEVVAgAkAAAAAGRlcGxveVZvdGluZ09rBNCOmDDTHwGCEGHgcQe68uCB0wfTB1lsEts8f+AgghD2DZI1uo62MNMfAYIQ9g2SNbry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMH0wdVIGwT4CCCEJRqmLa64wLAABkaGxwC9IIA04P4IyW+8vSCAOc7+CNTVKC78vSBNFVTFbvy9FNQqIIAyir4QW8kE18DIrzy9PhD+Cj4Qts8XHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIOR0BzCuAQCNZ9A9voZIwbd8gbpIwbY4R0NQB0AHUAdAB0z9VIGwTbwPiIG7y0IBvI4BABKDIVSDIUAPPFslQA8zIUAPPFslYzMs/yRA8EiBulTBZ9FswlEEz9BfiCX9wgEIQI21tbds8fyEBUDDTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH8eA9CP4vkBIILwYzZfg60dGF8zbQ5kz84ZGQ82I9bZdsMMYZisIJyJRu66jxQw2zz4Qn9wgQCCECNtbW3bPH/bMeCC8PoaAb4eKa0KlYmgT95wyFVetiNTVW25C+Qi8anF15WduuMCkTDicCAhHwGa+EFvJBNfA1AEoXBw+EJAh8hVIIIQTYfxi1AEyx9YINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WywfLB8kQRlBSFBMQRhBF2zwhATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPCECNts8+EJ/+CdvEIIQBfXhAKFwECNtbW3bPH/bMSAhABL4QlLQxwXy4IQByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAIgCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAAKyz/JAcwCASAmJwIBIDIzAgEgKCkCASAvMAIRsWs2zzbPGzRgQioCASArLAACKgIRrc5tnm2eNmjAQi0CEa8HbZ5tnjZpQEIuAAIhAARTmAIRsmZ2zzbPGzRgQjEAubL0YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwnZdOWrNOy3M6DpZtlGbopIJwQM51aecV+dJQsB1hbiZHsoAACIwIBIDQ1AgFmOjsCAUg2NwB1sm7jQ1aXBmczovL1FtZEp4eWp0WkNOMUZ5a2NVS3JBNkN3OUFpSjZuM24zeHJab0htTmpMalRYeUGCAAEKq+7UTQ0gABAkypZCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjbPFUM2zxs0UI4AZD4Q/goWNs8cFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Ig5ANYC0PQEMG0BgR1mAYAQ9A9vofLghwGBHWYiAoAQ9BfIAcj0AMkBzHABygBAA1kg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyQIQqZTbPNs8bNFCPAIBSD0+AAIgAhOgz2zzbPGyqbDqQj8CD6HTbPNs8bNGQkMC8lR8ulR8ulR8ulR8uixWGFYaVhRWF1YXDBEeDAsRHQsKERwKCREbCQgRGggHERkHBhEYBgURFwUEERYEAxEVAwIRFAIBERMBERLbPGxVNTU1NVIzoBCeEI0QfBBrEFpEQBMOERYODREVDQwRFAwLERMLChESCg4REQ5AQQDQcCCTUwu5jl4qgEAiWfQPb6GSMG3fIG6SMG2OEdDUAdAB1AHQAdM/VSBsE28D4m6zjjIqgEAiWfQPb6GSMG3fIG6SMG2OEdDUAdAB1AHQAdM/VSBsE28D4iBu8tCAbyNsIRKgAd6k6DAAGA0REA0QzxC+XioQqwKE7UTQ1AH4Y9IAAeMC+CjXCwqDCbry4In6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAWQLRAds8REUAAiIA9PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTP9MH9ARZAtQB0NQB0AHUAdAB1AHQAdQB0NQw0BRDMATTP9MH0z/TPzAQjRCMEIsQihBnEFYQRWwdAJyCAIWq+EJSMMcF8vRwIMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIcG1wVHAAiwiLCIsIiwgQrBCrVTM=');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initVoting_init_args({ $$type: 'Voting_init_args', organization, votingId })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Voting_errors: { [key: number]: { message: string } } = {
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
    28869: { message: `Votes already casted` },
    34218: { message: `Only the organization can deploy the voting contract` },
    37618: { message: `Only the voting contract can deploy this contract` },
    38223: { message: `Start time should be in the future` },
    51754: { message: `Insufficient funds` },
    54147: { message: `Voting has not started yet` },
    59195: { message: `Voting has ended` },
}

const Voting_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"InitOrganization","header":2483039406,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"InitOrganizationWithMetadata","header":3404583615,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"metadata","type":{"kind":"simple","type":"Metadata","optional":false}}]},
    {"name":"DeployVoting","header":2352013716,"fields":[{"name":"candidates","type":{"kind":"simple","type":"CandidateArray","optional":false}},{"name":"voteFee","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"votesPerCandidate","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"startTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"timeToLive","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployVotingWithMetadata","header":3253980079,"fields":[{"name":"candidates","type":{"kind":"simple","type":"CandidateArray","optional":false}},{"name":"voteFee","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"votesPerCandidate","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"startTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"timeToLive","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"metadata","type":{"kind":"simple","type":"Metadata","optional":false}}]},
    {"name":"SetDeployVotingFee","header":3911156721,"fields":[{"name":"newFee","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"OrganizationBasicInfo","header":null,"fields":[{"name":"emoji","type":{"kind":"simple","type":"string","optional":false}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"website","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"OrganizationAllInfo","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"emoji","type":{"kind":"simple","type":"string","optional":false}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}},{"name":"website","type":{"kind":"simple","type":"string","optional":false}},{"name":"numOfVotings","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"Metadata","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}},{"name":"emoji","type":{"kind":"simple","type":"string","optional":false}},{"name":"website","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"Candidate","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"info","type":{"kind":"simple","type":"string","optional":false}},{"name":"votes","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CandidateArray","header":null,"fields":[{"name":"size","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"candidates","type":{"kind":"dict","key":"uint","keyFormat":64,"value":"Candidate","valueFormat":"ref"}}]},
    {"name":"InitVoting","header":4246717119,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"candidates","type":{"kind":"simple","type":"CandidateArray","optional":false}},{"name":"voteFee","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"votesPerCandidate","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"startTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"timeToLive","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"InitVotingWithMetadata","header":3692900348,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"candidates","type":{"kind":"simple","type":"CandidateArray","optional":false}},{"name":"voteFee","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"votesPerCandidate","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"startTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"timeToLive","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"metadata","type":{"kind":"simple","type":"Metadata","optional":false}}]},
    {"name":"DeployAndCastVote","header":1642098951,"fields":[{"name":"candidateInd","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"numOfVotes","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"DeployAndCastVoteOk","header":4128084533,"fields":[{"name":"voter","type":{"kind":"simple","type":"address","optional":false}},{"name":"candidateInd","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"numOfVotes","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"VotingBasicInfo","header":null,"fields":[{"name":"emoji","type":{"kind":"simple","type":"string","optional":false}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"startTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"endTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"VotingAllInfo","header":null,"fields":[{"name":"organization","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"emoji","type":{"kind":"simple","type":"string","optional":false}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}},{"name":"numOfVotes","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"voteFee","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"votesPerCandidate","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"startTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"endTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CastVote","header":1300754827,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"candidateInd","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"numOfVotes","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
]

const Voting_getters: ABIGetter[] = [
    {"name":"organization","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"votingId","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"candidates","arguments":[],"returnType":{"kind":"simple","type":"CandidateArray","optional":false}},
    {"name":"numOfVotes","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"voteFee","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"votesPerCandidate","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"startTime","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"timeToLive","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"metadata","arguments":[],"returnType":{"kind":"simple","type":"Metadata","optional":false}},
    {"name":"voteAddress","arguments":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"basicInfo","arguments":[],"returnType":{"kind":"simple","type":"VotingBasicInfo","optional":false}},
    {"name":"allInfo","arguments":[],"returnType":{"kind":"simple","type":"VotingAllInfo","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const Voting_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"InitVoting"}},
    {"receiver":"internal","message":{"kind":"typed","type":"InitVotingWithMetadata"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DeployAndCastVote"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DeployAndCastVoteOk"}},
    {"receiver":"internal","message":{"kind":"text","text":"withdrawAll"}},
    {"receiver":"internal","message":{"kind":"text","text":"withdrawSafe"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Voting implements Contract {
    
    static async init(organization: Address, votingId: bigint) {
        return await Voting_init(organization, votingId);
    }
    
    static async fromInit(organization: Address, votingId: bigint) {
        const init = await Voting_init(organization, votingId);
        const address = contractAddress(0, init);
        return new Voting(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Voting(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Voting_types,
        getters: Voting_getters,
        receivers: Voting_receivers,
        errors: Voting_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | InitVoting | InitVotingWithMetadata | DeployAndCastVote | DeployAndCastVoteOk | 'withdrawAll' | 'withdrawSafe' | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InitVoting') {
            body = beginCell().store(storeInitVoting(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InitVotingWithMetadata') {
            body = beginCell().store(storeInitVotingWithMetadata(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeployAndCastVote') {
            body = beginCell().store(storeDeployAndCastVote(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeployAndCastVoteOk') {
            body = beginCell().store(storeDeployAndCastVoteOk(message)).endCell();
        }
        if (message === 'withdrawAll') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'withdrawSafe') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getOrganization(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('organization', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getVotingId(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('votingId', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getCandidates(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('candidates', builder.build())).stack;
        const result = loadTupleCandidateArray(source);
        return result;
    }
    
    async getNumOfVotes(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('numOfVotes', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getVoteFee(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('voteFee', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getVotesPerCandidate(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('votesPerCandidate', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getStartTime(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('startTime', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getTimeToLive(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('timeToLive', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getMetadata(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('metadata', builder.build())).stack;
        const result = loadTupleMetadata(source);
        return result;
    }
    
    async getVoteAddress(provider: ContractProvider, owner: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(owner);
        let source = (await provider.get('voteAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getBasicInfo(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('basicInfo', builder.build())).stack;
        const result = loadTupleVotingBasicInfo(source);
        return result;
    }
    
    async getAllInfo(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('allInfo', builder.build())).stack;
        const result = loadTupleVotingAllInfo(source);
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}