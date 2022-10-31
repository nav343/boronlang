import lexer = require("./lexer.js");
export { lexer as Lexer };
export declare const ParserRules: ({
    name: string;
    symbols: never[];
    postprocess?: undefined;
} | {
    name: string;
    symbols: any[];
    postprocess: (d: any) => any;
})[];
export declare const ParserStart: string;
