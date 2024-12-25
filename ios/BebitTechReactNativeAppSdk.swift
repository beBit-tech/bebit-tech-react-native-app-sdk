import OmniSegmentKit

@objc(BebitTechReactNativeAppSdk)
class BebitTechReactNativeAppSdk: NSObject {

  @objc(setAppId:)
  func setBundleId(id: String) -> Void {
    OmniSegment.setBundleId(id)
  }

  @objc(setAppVersion:)
  func setBundleVersion(version: String) -> Void {
    OmniSegment.setBundleVersion(version)
  }

  @objc(setAppName:)
  func setAppName(name: String) -> Void {
    OmniSegment.setAppName(name)
  }

  @objc(setDeviceId:)
  func setDeviceId(id: String) -> Void {
    OmniSegment.setDeviceId(id)
  }

  @objc(login:)
  func login(uid: String) -> Void {
    OmniSegment.login(uid: uid)
  }

  @objc
  func logout() -> Void {
    OmniSegment.logout()
  }

  @objc(setCurrentPage:)
  func setCurrentPage(pageKey: String) -> Void {
    OmniSegment.setCurrentPage(pageKey)
  }

  @objc(setFCMToken:)
  func setFCMToken(token: String) -> Void {
    OmniSegment.setFCMToken(token)
  }

  @objc(setUid:)
  func setUid(uid: String) -> Void {
    OmniSegment.setUid(uid: uid)
  }

  @objc
  func clearUid() -> Void {
    OmniSegment.clearUid()
  }

  @objc func setPopupRedirectCallback(_ callback: @escaping RCTResponseSenderBlock) {
      let swiftCallback: (String) -> Void = { url in
          callback([url])
      }
      OmniSegment.setPopupRedirectCallback(swiftCallback)
  }

  @objc(trackEvent:)
  func trackEvent(eventJsonString: String) -> Void {
    if let data = eventJsonString.data(using: .utf8) {
      do {
        if let eventJson = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] {
          print("Send event payload: \(eventJson)")

          let event_action: String
          if let eventAction = eventJson["event_action"] as? String {
              event_action = eventAction
              print("Send event_action? : \(event_action)")
          } else {
              event_action = ""
              print("Impression event sent without event_action")
          }

          let event = OSGEvent.custom(action: event_action)
          event.appendAttributes(eventJson)
          OmniSegment.trackEvent(event)
        } else {
          print("Invalid event json")
        }
      } catch {
        print(error.localizedDescription)
      }
    }
  }
}
