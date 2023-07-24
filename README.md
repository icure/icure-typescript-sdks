<p align="center">
    <a href="https://docs.icure.com">
        <img alt="icure-your-data-platform-for-medtech-and-ehr" src="https://icure.com/assets/icons/logo.svg">
    </a>
    <h1 align="center">iCure EHR-Lite</h1>
</p>

## Installation

Use the package manager [yarn](https://yarnpkg.com/getting-started/install) to install `@icure/ehr-lite-sdk`.

```bash
yarn add @icure/ehr-lite-sdk
```

or with [npm](https://docs.npmjs.com/getting-started)

```bash
npm install @icure/ehr-lite-sdk
```

## Usage example

```typescript
import {
    EHRLite,
    ICURE_CLOUD_URL,
} from "@icure/ehr-lite-sdk";

const api = await new EHRLite.Builder()
    .withICureBaseUrl(ICURE_CLOUD_URL)
    .withCrypto(crypto) // WebCrypto implementation
    .withMsgGwSpecId(process.env.REACT_APP_EXTERNAL_SERVICES_SPEC_ID!) // External services spec id
    .withAuthProcessByEmailId(process.env.REACT_APP_EMAIL_AUTHENTICATION_PROCESS_ID!) // Email authentication process id
    .withStorage(storage) // Custom storage implementation
    .withUserName(email) // User email
    .withPassword(token) // User password
    .build()

const user = await api.userApi.getLogged()
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

### Running tests

```bash
yarn run test
```

## License

[MIT](https://choosealicense.com/licenses/mit/)