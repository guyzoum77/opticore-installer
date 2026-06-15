export type TSValidate = (messageInvalidValue: string,
                          messageBadPattern: string,
                          regex?: string) => (value: string) => (string | undefined);