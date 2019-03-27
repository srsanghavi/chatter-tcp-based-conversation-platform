package edu.northeastern.ccs.im.group;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.Assert.assertEquals;

public class GroupTest {


  @Test
  public void getNameTest() {
    Group group = new Group("Test");
    assertEquals("Test", group.getName());
  }

  @Test
  public void testPublicGroup(){
    Group group = new Group("Test");
    assertEquals(true,group.getSearchable());
  }

  @Test
  public void testPrivateGroup(){
    Group group = new Group("Test");
    group.makeGroupPrivate();
    assertEquals(false,group.getSearchable());
  }


}
