import { bind } from './bind';

describe('bind', () => {
  it('binds attributes', () => {
    document.documentElement.innerHTML = `
      <div bind [inner-html]="html"></div>
      <div bind [inner-html]="html"></div>
    `;

    const context = {
      html: '<span>inserted</span>'
    };

    bind(document, context);

    const els = document.querySelectorAll<HTMLElement>('[bind]');

    expect(els[0].innerHTML).toEqual(context.html);
    expect(els[1].innerHTML).toEqual(context.html);

    const update = '<span>updated</span>';
    context.html = update;

    expect(els[0].innerHTML).toEqual(update);
    expect(els[1].innerHTML).toEqual(update);
  });

  it('binds attributes to sub-objects', () => {
    document.documentElement.innerHTML = `
      <div bind [inner-html]="data.html"></div>
    `;

    const context = {
      data: {
        html: '<span>inserted</span>'
      }
    };

    bind(document, context);

    const el = document.querySelector<HTMLElement>('[bind]')!;
    expect(el).not.toBeNull();

    expect(el.innerHTML).toEqual(context.data.html);

    const update = '<span>updated</span>';
    context.data.html = update;

    expect(el.innerHTML).toEqual(update);
  });

  it('binds attributes when no context property', () => {
    document.documentElement.innerHTML = `
      <div bind [title]="title"></div>
      <div bind [title]="title"></div>
    `;

    const context: any = {};

    bind(document, context);

    const els = document.querySelectorAll<HTMLElement>('[bind]');

    expect(els[0].innerHTML).toEqual('');
    expect(els[1].innerHTML).toEqual('');

    const update = 'update';
    context.title = update;

    expect(els[0].title).toEqual(update);
    expect(els[1].title).toEqual(update);
  });

  it('binds events', async () => {
    document.documentElement.innerHTML = '<div bind {click}="onClick"></div>';

    let recievedEvent: Event = null!;
    const context = {
      onClick: (e: Event) => (recievedEvent = e)
    };

    bind(document, context);

    const el = document.querySelector<HTMLElement>('[bind]')!;
    expect(el).not.toBeNull();

    el.click();

    expect(recievedEvent).not.toBeUndefined();
  });

  it('this is bound to element in function properties', async () => {
    document.documentElement.innerHTML = `
      <div data-id="one" bind [inner-html]="html"></div>
      <div data-id="two" bind [inner-html]="html"></div>
    `;

    const els = document.querySelectorAll<HTMLElement>('[bind]');

    const context = {
      html() {
        return `<span>inserted ${this.dataset.id}</span>`;
      }
    };

    bind(document, context);

    expect(els[0].innerHTML).toEqual('<span>inserted one</span>');
    expect(els[1].innerHTML).toEqual('<span>inserted two</span>');

    els[0].dataset.id = 'three';
    context.html();

    expect(els[0].innerHTML).toEqual('<span>inserted three</span>');
    expect(els[1].innerHTML).toEqual('<span>inserted two</span>');
  });

  it('this is bound to element in event handlers', async () => {
    document.documentElement.innerHTML = '<div bind {click}="onClick"></div>';

    const el = document.querySelector<HTMLElement>('[bind]')!;
    expect(el).not.toBeNull();

    let elThis: HTMLElement = null!;

    const context = {
      onClick: function (e: MouseEvent) {
        elThis = e.currentTarget as HTMLElement;
      }
    };

    bind(document, context);

    el.click();

    expect(elThis).toBe(el);
  });
});
