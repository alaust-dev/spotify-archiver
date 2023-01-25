import {expect, test} from "bun:test";
import DateUtil from "../../../src/common/utils/date-util.js";

test('01.04.2023 is KW 131', () => {
    expect(DateUtil.getWeekOfYear(new Date('2023-04-01'))).toBe(13)
})