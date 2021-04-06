const chai = window.chai
const expect = chai.expect

const API_URL = '../api.php?page=1';
describe('Get Nodes from first page', () => {
    it('should be able to get a 20 nodes', async () => {
        const response = await fetch(API_URL).then(res => res.json())
        expect(response.nodes).to.have.lengthOf(20);
    });
});


describe('nodes should fail without json response', () => {
    it('Should get error', async () => {
        const response = await fetch(API_URL)
        expect(response.nodes).to.be.undefined;
    });
});

describe('Deep checking for data response', () => {
    it('Mock response checking', async () => {
        const response = await fetch(API_URL).then(res => res.json())
        const mock = await fetch("mock.json")
            .then(response => response.json())
        expect(mock).to.be.deep.equal(response);
    });
});