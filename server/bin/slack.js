import getApp from '..';

const port = process.env.PORT || 4000;
const host = '0.0.0.0';
// eslint-disable-next-line no-console
getApp().listen(port, host, () => console.log(`port: ${port}`));
