import { Controller } from '@stridespark/tsoa';
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
export declare const enum Eenum {
    a = "a",
    b = "b"
}
export declare type Resp = RespType1 | RespType2;
export declare class TestController extends Controller {
    genstring(): Promise<TestModel<string>>;
    discun(): Promise<Resp>;
}
