// Licensed to Cloudera, Inc. under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  Cloudera, Inc. licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var PigLatinHighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        start: [{
            token: "comment.line.double-dash.pig_latin",
            regex: /--.*$/
        }, {
            token: "comment.block.pig_latin",
            regex: /\/\*/,
            push: [{
                token: "comment.block.pig_latin",
                regex: /\*\//,
                next: "pop"
            }, {
                defaultToken: "comment.block.pig_latin"
            }]
        }, {
            token: "constant.language.pig_latin",
            regex: /\b(?:null|true|false|stdin|stdout|stderr)\b/,
            caseInsensitive: true
        }, {
            token: "constant.numeric.pig_latin",
            regex: /\b[\d]+(?:\.[\d]+)?(?:e[\d]+)?[LF]?\b/,
            caseInsensitive: true
        }, {
            token: "string.quoted.double.pig_latin",
            regex: /"/,
            push: [{
                token: "string.quoted.double.pig_latin",
                regex: /"/,
                next: "pop"
            }, {
                token: "constant.character.escape.pig_latin",
                regex: /\\./
            }, {
                defaultToken: "string.quoted.double.pig_latin"
            }]
        }, {
            token: "string.quoted.single.pig_latin",
            regex: /'/,
            push: [{
                token: "string.quoted.single.pig_latin",
                regex: /'/,
                next: "pop"
            }, {
                token: "constant.character.escape.pig_latin",
                regex: /\\./
            }, {
                defaultToken: "string.quoted.single.pig_latin"
            }]
        }, {
            token: "string.quoted.other.pig_latin",
            regex: /`/,
            push: [{
                token: "string.quoted.other.pig_latin",
                regex: /`/,
                next: "pop"
            }, {
                token: "constant.character.escape.pig_latin",
                regex: /\\./
            }, {
                defaultToken: "string.quoted.other.pig_latin"
            }]
        }, {
            token: "keyword.operator.arithmetic.pig_latin",
            regex: /\+|-|\*|\/|%/
        }, {
            token: "keyword.operator.bincond.pig_latin",
            regex: /\?|:/
        }, {
            token: "keyword.operator.comparison.pig_latin",
            regex: /==|!=|<=|>=|<|>|\bmatches\b/,
            caseInsensitive: true
        }, {
            token: "keyword.operator.null.pig_latin",
            regex: /\b(?:is\s+null|is\s+not\s+null)\b/,
            caseInsensitive: true
        }, {
            token: "keyword.operator.boolean.pig_latin",
            regex: /\b(?:and|or|not)\b/,
            caseInsensitive: true
        }, {
            token: "keyword.operator.relation.pig_latin",
            regex: /\b::\b/
        }, {
            token: "keyword.operator.dereference.pig_latin",
            regex: /\b(?:\.|#)\b/
        }, {
            token: "keyword.control.conditional.pig_latin",
            regex: /\b(?:CASE|WHEN|THEN|ELSE|END)\b/,
            caseInsensitive: true
        }, {
            token: "keyword.control.relational.pig_latin",
            regex: /\b(?:ASSERT|COGROUP|CROSS|CUBE|distinct|filter|foreach|generate|group|join|limit|load|order|sample|split|store|stream|union)\b/,
            caseInsensitive: true
        }, {
            token: "keyword.control.diagnostic.pig_latin",
            regex: /\b(?:describe|dump|explain|illustrate)\b/,
            caseInsensitive: true
        }, {
            token: "keyword.control.macro.pig_latin",
            regex: /\b(?:define|import|register)\b/,
            caseInsensitive: true
        }, {
            token: "keyword.control.clause.pig_latin",
            regex: /\b(?:any|all|asc|arrange|as|asc|by|desc|full|if|inner|into|left|outer|parallel|returns|right|through|using)\b/,
            caseInsensitive: true
        }, {
            token: "support.function.operator.pig_latin",
            regex: /\bFLATTEN\b/,
            caseInsensitive: true
        }, {
            token: "support.function.operation.pig_latin",
            regex: /\b(?:CUBE|ROLLUP)\b/,
            caseInsensitive: true
        }, {
            token: "support.function.eval.pig_latin",
            regex: /\b(?:AVG|CONCAT|COUNT|COUNT_STAR|DIFF|IsEmpty|MAX|MIN|PluckTuple|SIZE|SUBTRACT|SUM|Terms|TOKENIZE|Usage)\b/
        }, {
            token: "support.function.math.pig_latin",
            regex: /\b(?:ABS|ACOS|ASIN|ATAN|CBRT|CEIL|COS|COSH|EXP|FLOOR|LOG|LOG10|RANDOM|ROUND|SIN|SINH|SORT|TAN|TANH)\b/
        }, {
            token: "support.function.string.pig_latin",
            regex: /\b(?:ENDSWITH|EqualsIgnoreCase|INDEXOF|LAST_INDEX_OF|LCFIRST|LOWER|LTRIM|REGEX_EXTRACT|REGEX_EXTRACT_ALL|REPLACE|RTRIM|STARTSWITH|STRSPLIT|SUBSTRING|TRIM|UCFIRST|UPPER)\b/
        }, {
            token: "support.function.datetime.pig_latin",
            regex: /\b(?:AddDuration|CurrentTime|DaysBetween|GetDay|GetHour|GetMilliSecond|GetMinute|GetMonth|GetSecond|GetWeek|GetWeekYear|GetYear|HoursBetween|MilliSecondsBetween|MinutesBetween|MonthsBetween|SecondsBetween|SubtractDuration|ToDate|ToMilliSeconds|ToString|ToUnixTime|WeeksBetween|YearsBetween)\b/
        }, {
            token: "support.function.tuple.pig_latin",
            regex: /\b(?:TOTUPLE|TOBAG|TOMAP|TOP)\b/,
            caseInsensitive: true
        }, {
            token: "support.function.macro.pig_latin",
            regex: /\b(?:input|output|ship|cache)\b/,
            caseInsensitive: true
        }, {
            token: "support.function.storage.pig_latin",
            regex: /\b(?:AvroStorage|BinStorage|BinaryStorage|HBaseStorage|JsonLoader|JsonStorage|PigDump|PigStorage|PigStreaming|TextLoader|TrevniStorage)\b/,
            caseInsensitive: true
        }, {
            token: "keyword.other.command.shell.pig_latin",
            regex: /\b(?:fs|sh)\b/,
            caseInsensitive: true
        }, {
            token: "keyword.other.command.shell.file.pig_latin",
            regex: /\b(?:cat|cd|copyFromLocal|copyToLocal|cp|ls|mkdir|mv|pwd|rm|rmf)\b/,
            caseInsensitive: true
        }, {
            token: "keyword.other.command.shell.utility.pig_latin",
            regex: /\b(?:clear|exec|help|history|kill|quit|run|set)\b/,
            caseInsensitive: true
        }, {
            token: "storage.type.simple.pig_latin",
            regex: /\b(?:int|long|float|double|chararray|bytearray|boolean|datetime|biginteger|bigdecimal)\b/,
            caseInsensitive: true
        }, {
            token: "storage.type.complex.pig_latin",
            regex: /\b(?:tuple|bag|map)\b/,
            caseInsensitive: true
        }, {
            token: "variable.other.positional.pig_latin",
            regex: /\$[0-9_]+/
        }, {
            token: "variable.other.alias.pig_latin",
            regex: /\b[a-z][a-z0-9_]*\b/,
            caseInsensitive: true
        }]
    }
    
    this.normalizeRules();
};

PigLatinHighlightRules.metaData = {
    fileTypes: ["pig"],
    name: "Pig Latin",
    scopeName: "source.pig_latin"
}


oop.inherits(PigLatinHighlightRules, TextHighlightRules);

exports.PigLatinHighlightRules = PigLatinHighlightRules;
});