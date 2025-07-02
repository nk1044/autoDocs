# Create a Custom Component in SuperEditor


```dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:super_editor/super_editor.dart';

/// A non-selectable page break node
class PageBreakNode extends DocumentNode {
  PageBreakNode({
    required this.id,
    required this.text,
    super.metadata,
  }) {
    metadata.putIfAbsent('blockType', () => NamedAttribution('pagebreak'));
  }

  @override
  final String id;

  final AttributedText text;

  @override
  TextNodeSelection computeSelection({
    required NodePosition base,
    required NodePosition extent,
  }) {
    return TextNodeSelection(
      baseOffset: (base as TextNodePosition).offset,
      extentOffset: (extent as TextNodePosition).offset,
    );
  }

  @override
  String copyContent(dynamic selection) => '';

  @override
  TextNodePosition get beginningPosition => const TextNodePosition(offset: 0);

  @override
  TextNodePosition get endPosition => TextNodePosition(offset: text.toPlainText().length);

  @override
  bool containsPosition(Object position) {
    return position is TextNodePosition &&
        position.offset >= 0 &&
        position.offset <= text.toPlainText().length;
  }

  @override
  PageBreakNode copyAndReplaceMetadata(Map<String, dynamic> metadata) {
    return PageBreakNode(id: id, text: text, metadata: metadata);
  }

  @override
  PageBreakNode copyWithAddedMetadata(Map<String, dynamic> metadata) {
    final newMetadata = Map<String, dynamic>.from(this.metadata);
    newMetadata.addAll(metadata);
    return copyAndReplaceMetadata(newMetadata);
  }

  @override
  NodePosition selectDownstreamPosition(NodePosition base, NodePosition extent) => extent;

  @override
  NodePosition selectUpstreamPosition(NodePosition base, NodePosition extent) => base;
}

/// View model used by PageBreakComponent
class PageBreakComponentViewModel extends SingleColumnLayoutComponentViewModel {
  PageBreakComponentViewModel({
    required super.nodeId,
    this.blockType,
    required this.text,
    super.maxWidth,
    super.padding = EdgeInsets.zero,
  });

  final AttributedText text;
  final Attribution? blockType;

  @override
  PageBreakComponentViewModel copy() => PageBreakComponentViewModel(
        nodeId: nodeId,
        text: text,
        blockType: blockType,
        maxWidth: maxWidth,
        padding: padding,
      );

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is PageBreakComponentViewModel &&
          super == other &&
          text == other.text &&
          blockType == other.blockType;

  @override
  int get hashCode => super.hashCode ^ text.hashCode ^ blockType.hashCode;
}


/// Visual component that renders the PageBreakNode
class PageBreakComponent extends StatefulWidget {
  const PageBreakComponent({
    super.key,
    required this.viewModel,
  });

  final PageBreakComponentViewModel viewModel;

  @override
  State<PageBreakComponent> createState() => _PageBreakComponentState();
}

class _PageBreakComponentState extends State<PageBreakComponent> with DocumentComponent<PageBreakComponent> {
  @override
  bool isVisualSelectionSupported() => false;

  @override
  Widget build(BuildContext context) {
    final label = widget.viewModel.text.toPlainText();
    final style = Theme.of(context).textTheme.bodySmall ?? const TextStyle();

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 16),
      child: Row(
        children: [
          Expanded(child: Container(height: 1, color: Colors.grey.shade400)),
          if (label.isNotEmpty) ...[
            const SizedBox(width: 8),
            Text(label, style: style.copyWith(color: Colors.grey.shade600, fontSize: 12)),
            const SizedBox(width: 8),
          ],
          Expanded(child: Container(height: 1, color: Colors.grey.shade400)),
        ],
      ),
    );
  }

  // DocumentComponent methods
  Key get componentKey => widget.key!;

  @override
  TextNodePosition? getPositionAtOffset(Offset localOffset) => null;

  @override
  Offset getOffsetForPosition(NodePosition position) => Offset.zero;

  @override
  Rect getRectForPosition(NodePosition position) => Rect.zero;

  @override
  Rect getEdgeForPosition(NodePosition position) => Rect.zero;

  @override
  Rect getRectForSelection(NodePosition base, NodePosition extent) => Rect.zero;

  @override
  TextNodePosition getBeginningPosition() => const TextNodePosition(offset: 0);

  @override
  TextNodePosition getEndPosition() =>
      TextNodePosition(offset: widget.viewModel.text.toPlainText().length);

  @override
  TextNodePosition getBeginningPositionNearX(double x) => const TextNodePosition(offset: 0);

  @override
  TextNodePosition getEndPositionNearX(double x) =>
      TextNodePosition(offset: widget.viewModel.text.toPlainText().length);

  @override
  TextNodePosition? movePositionLeft(NodePosition position, [MovementModifier? modifier]) {
    final offset = (position as TextNodePosition).offset;
    return TextNodePosition(offset: offset > 0 ? offset - 1 : 0);
  }

  @override
  TextNodePosition? movePositionRight(NodePosition position, [MovementModifier? modifier]) {
    final offset = (position as TextNodePosition).offset;
    final length = widget.viewModel.text.toPlainText().length;
    return TextNodePosition(offset: offset < length ? offset + 1 : length);
  }

  @override
  TextNodePosition? movePositionUp(NodePosition position, [MovementModifier? modifier]) => null;

  @override
  TextNodePosition? movePositionDown(NodePosition position, [MovementModifier? modifier]) => null;

  @override
  TextNodeSelection getSelectionInRange(Offset baseOffset, Offset extentOffset) =>
      const TextNodeSelection(baseOffset: 0, extentOffset: 0);

  @override
  TextNodeSelection getCollapsedSelectionAt(NodePosition position) {
    final offset = (position as TextNodePosition).offset;
    return TextNodeSelection(baseOffset: offset, extentOffset: offset);
  }

  @override
  TextNodeSelection getSelectionBetween({
    required NodePosition basePosition,
    required NodePosition extentPosition,
  }) {
    final base = (basePosition as TextNodePosition).offset;
    final extent = (extentPosition as TextNodePosition).offset;
    return TextNodeSelection(baseOffset: base, extentOffset: extent);
  }

  @override
  TextNodeSelection getSelectionOfEverything() =>
      const TextNodeSelection(baseOffset: 0, extentOffset: 0);

  @override
  MouseCursor? getDesiredCursorAtOffset(Offset localOffset) => null;
}


/// Connects the node to its view model and widget
class PageBreakComponentBuilder implements ComponentBuilder {
  const PageBreakComponentBuilder();

  @override
  SingleColumnLayoutComponentViewModel? createViewModel(Document doc, DocumentNode node) {
    if (node is! PageBreakNode) return null;

    return PageBreakComponentViewModel(
      nodeId: node.id,
      text: node.text,
      blockType: node.getMetadataValue('blockType'),
    );
  }

  @override
  Widget? createComponent(
    SingleColumnDocumentComponentContext context,
    SingleColumnLayoutComponentViewModel viewModel,
  ) {
    if (viewModel is! PageBreakComponentViewModel) return null;

    return PageBreakComponent(
      key: context.componentKey,
      viewModel: viewModel,
    );
  }
}

DocumentKeyboardAction deletePageBreakNode({
  required Editor editor,
  required DocumentComposer composer,
  required DocumentLayoutResolver layoutResolver,
}) {
  return ({
    required SuperEditorContext editContext,
    required KeyEvent keyEvent,
  }) {
    if (keyEvent is! KeyDownEvent) return ExecutionInstruction.continueExecution;

    if (keyEvent.logicalKey == LogicalKeyboardKey.delete ||
        keyEvent.logicalKey == LogicalKeyboardKey.backspace) {
      final selection = editContext.composer.selection;

      if (selection == null || !selection.isCollapsed) {
        return ExecutionInstruction.continueExecution;
      }

      final nodeId = selection.extent.nodeId;
      final node = editor.document.getNodeById(nodeId);
      final extent = selection.extent.nodePosition;

      // Case 1: Caret is *inside* a PageBreakNode
      if (node is PageBreakNode) {
        return ExecutionInstruction.haltExecution;
      }

      // Case 2: Caret is at the start of another node,
      // and previous node is a PageBreakNode
      final isAtStart = extent is TextNodePosition && extent.offset == 0;
      if (isAtStart) {
        final nodeIndex = editor.document.getNodeIndexById(nodeId);
        if (nodeIndex > 0) {
          final previousNode = editor.document.getNodeAt(nodeIndex - 1);
          if (previousNode is PageBreakNode) {
            return ExecutionInstruction.haltExecution;
          }
        }
      }
    }
    return ExecutionInstruction.continueExecution;
  };
}
```