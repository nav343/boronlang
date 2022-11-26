export { ifLexer as Lexer };
export declare const ParserRules: ({
    name: string;
    symbols: any[];
    postprocess?: undefined;
} | {
    name: string;
    symbols: any[];
    postprocess: (d: any) => any;
})[];
export declare const ParserStart: string;
