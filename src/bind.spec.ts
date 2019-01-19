import { bind } from './bind';

describe('bind', () => {
  it('binds attributes', () => {
    document.documentElement.innerHTML = '<div bind [inner-html]="html"></div>';

    const context = {
      html: '<span>inserted</span>'
    };

    bind(document, context);

    const el = document.querySelector<HTMLElement>('[bind]');

    expect(el.innerHTML).toEqual(context.html);
  });

  it('binds events', async () => {
    document.documentElement.innerHTML = '<div bind {click}="onClick"></div>';

    let recievedEvent: Event;
    const context = {
      onClick: (e: Event) => (recievedEvent = e)
    };

    bind(document, context);

    const el = document.querySelector<HTMLElement>('[bind]');
    await el.click();

    expect(recievedEvent).not.toBeNull();
  });
});
