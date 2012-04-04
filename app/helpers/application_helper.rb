module ApplicationHelper
  def controller_and_action_eql(controller, action)
    controller_eql(controller) && action_eql(action)
  end
  def controller_eql(controller)
    controller_name == controller.to_s
  end
  def action_eql(action)
    action_name == action.to_s
  end
end
