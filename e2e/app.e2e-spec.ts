import { ANDlinked4Page } from './app.po';

describe('andlinked4 App', () => {
  let page: ANDlinked4Page;

  beforeEach(() => {
    page = new ANDlinked4Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
