declare module "keycloak-js" {
    export const keycloakInitMock: jest.Mock
}

export const keycloakInitMock = jest.fn()

export default function KeyCloak() {
    return {
        init: keycloakInitMock
    }
}

