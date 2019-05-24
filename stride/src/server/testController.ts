import { Route, Controller, Get, Security } from '@stridespark/tsoa';

export interface TestModel<T> {
    result: T;
}

export interface RespBase {
    type: number;
}

export interface RespType1 extends RespBase {
    type: 1;
    name: string;
}

export interface RespType2 extends RespBase {
    type: 2;
    email: string;
}

export const enum Eenum {
    a = 'a',
    b = 'b',
}

export type Resp = RespType1 | RespType2;

@Route('Controller')
export class TestController extends Controller {
    @Get()
    @Security('apikey')
    public async genstring(): Promise<TestModel<string>> {
        return { result: 'hi' };
    }

    // @Get()
    // public async literalUnion(): Promise<Eenum> {
    //     return Eenum.a;
    // }

    @Get()
    public async discun(): Promise<Resp> {
        return { type: 1, name: 'one' };
    }

    // @Get()
    // public async genobj(): Promise<TestModel<{ key: string }>> {
    //     return { result: { key: 'hi' } };
    // }
}
