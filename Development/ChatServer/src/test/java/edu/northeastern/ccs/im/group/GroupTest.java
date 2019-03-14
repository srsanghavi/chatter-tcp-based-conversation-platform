package edu.northeastern.ccs.im.group;

import org.junit.jupiter.api.Test;
import static org.junit.Assert.assertEquals;

public class GroupTest {

  Group group = new Group("Test");

  @Test
  public void getNameTest() {
    assertEquals("Test", group.getName());
  }


}
