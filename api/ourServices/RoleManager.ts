export class RoleManager {
  getParentRole(child: number, parents: any, cb: any) {
   
  }

  getActionsBooleans(roleActions: any) {
    
  }

  async getRoleActionsAndRoutes(
    role_id: number,
    getActionsBooleans = false
  ): Promise<any> {
    
  }

  private async shapeActionRoutes(actionsRoutes: any[]) {
    
  }

  /**
     * @description function to validate that this role id is in the child role tree of the userRoleId
     * @param role_id
     */
  async validateUserRole(userRoleId: number, role_id: number) {

  }

  /**
     * @description function to get all children tree of a certain role
     * @param role_id
     */
  async getRoleChildren(role_id: number) {
    
  }

  /**
     * @description function to get just the direct children roles under a role
     * @param role_id
     */
  async getRoleDirectChildren(role_id: number) {
  }
}
