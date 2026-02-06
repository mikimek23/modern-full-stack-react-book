export default async () => {
  await global._MONGOINSTANCE.stop()
}
