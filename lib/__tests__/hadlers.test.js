const { home, notFound, serverError } = require('../handlers')

test('home page renders', async () => {
  const req = {
    query: {
      chainName: 'test_name',
      contractAddress: 'test_address'
    }
  }
  const res = { render: jest.fn() }
  await home(req, res)
  console.log('MOCK', res.render.mock.calls)
  expect(res.render).toHaveBeenCalled()
})
