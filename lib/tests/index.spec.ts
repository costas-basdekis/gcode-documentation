import { expect } from "chai";
import * as gcodeDocumentation from "../src";

describe("Index", () => {
    it("Contains a documentation service", () => {
        expect(gcodeDocumentation.DocumentationService).to.not.be.null;
    });
});
